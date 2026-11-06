import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import api, { API_URL } from "../services/api";
import { useAuth } from "./useAuth";
import {
  closeNotification,
  showLocalNotification,
  subscribeToPush,
} from "../utils/pushNotifications";

const COPY = {
  Pending: "Order received",
  Confirmed: "Order confirmed",
  Processing: "Preparing your order",
  Shipped: "Order shipped",
  Delivered: "Order delivered",
  Cancelled: "Order cancelled",
};

/**
 * Live order status for the signed-in customer.
 *
 * Uses a fetch-based Server-Sent Events stream (EventSource can't send the
 * Authorization header). Reconnects with backoff and re-syncs from
 * /orders/live every time the connection (re)opens or the tab regains focus.
 */
export default function useLiveOrders() {
  const { isAuthenticated, isStaff, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const lastStatus = useRef({});
  const enabled = isAuthenticated && !isStaff;

  const sync = useCallback(async () => {
    try {
      const res = await api.get("/orders/live");
      const list = res.orders || [];
      list.forEach((o) => (lastStatus.current[o.id] = o.status));
      setOrders(list);
    } catch {
      /* transient — stream/next sync will recover */
    }
  }, []);

  useEffect(() => {
    if (!enabled) {
      setOrders([]);
      return undefined;
    }

    let stopped = false;
    let controller;
    let retry = 0;
    let timer;

    const upsert = (o) =>
      setOrders((prev) => {
        const rest = prev.filter((x) => x.id !== o.id);
        return o.live?.active ? [o, ...rest] : rest;
      });

    const handle = (event, o) => {
      if (event === "order:update") {
        const changed = lastStatus.current[o.id] !== o.status;
        lastStatus.current[o.id] = o.status;
        upsert(o);
        if (changed) {
          const label = COPY[o.status] || o.status;
          if (document.hidden) {
            showLocalNotification({
              title: `${label} · #${o.id}`,
              body: o.firstItemName || "Tap to view your order",
              tag: `order-${o.id}`,
            });
          } else {
            toast(`${label} · #${o.id}`, { icon: "📦" });
          }
        }
      } else if (event === "order:live-closed") {
        delete lastStatus.current[o.id];
        setOrders((prev) => prev.filter((x) => x.id !== o.id));
        closeNotification(`order-${o.id}`);
        if (o.status === "Cancelled") toast(`Order #${o.id} was cancelled`, { icon: "❌" });
      }
    };

    const connect = async () => {
      controller = new AbortController();
      try {
        const token = localStorage.getItem("orbit-token");
        const res = await fetch(`${API_URL}/orders/stream`, {
          headers: { Authorization: `Bearer ${token}`, Accept: "text/event-stream" },
          signal: controller.signal,
        });
        if (!res.ok || !res.body) throw new Error(`stream ${res.status}`);

        retry = 0;
        sync();

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (!stopped) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          let idx;
          while ((idx = buffer.indexOf("\n\n")) !== -1) {
            const chunk = buffer.slice(0, idx);
            buffer = buffer.slice(idx + 2);
            let event = "message";
            let data = "";
            for (const line of chunk.split("\n")) {
              if (line.startsWith("event:")) event = line.slice(6).trim();
              else if (line.startsWith("data:")) data += line.slice(5).trim();
            }
            if (data) {
              try {
                handle(event, JSON.parse(data));
              } catch {
                /* ignore malformed frame */
              }
            }
          }
        }
      } catch (err) {
        if (stopped || err.name === "AbortError") return;
      }
      if (!stopped) {
        retry += 1;
        timer = setTimeout(connect, Math.min(1000 * 2 ** retry, 30000));
      }
    };

    connect();

    const onVisible = () => {
      if (!document.hidden) sync();
    };
    document.addEventListener("visibilitychange", onVisible);

    // Re-register push for devices that already granted permission.
    if ("Notification" in window && Notification.permission === "granted") {
      subscribeToPush().catch(() => {});
    }

    return () => {
      stopped = true;
      clearTimeout(timer);
      controller?.abort();
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [enabled, user?.id, sync]);

  return { orders, refresh: sync };
}
