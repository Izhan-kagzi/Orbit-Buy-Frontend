import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiBell,
  FiCheck,
  FiChevronDown,
  FiPackage,
  FiTruck,
} from "react-icons/fi";

import useLiveOrders from "../../hooks/useLiveOrders";
import {
  enableOrderNotifications,
  needsHomeScreenInstall,
  notificationsSupported,
} from "../../utils/pushNotifications";

const STEPS = ["Confirmed", "Processing", "Shipped", "Delivered"];

const LABEL = {
  Pending: "Order received",
  Confirmed: "Order confirmed",
  Processing: "Preparing order",
  Shipped: "Out for delivery",
  Delivered: "Delivered",
};

const stepIndex = (status) => Math.max(0, STEPS.indexOf(status));

const StatusIcon = ({ status, size = 16 }) => {
  if (status === "Delivered") return <FiCheck size={size} />;
  if (status === "Shipped") return <FiTruck size={size} />;
  return <FiPackage size={size} />;
};

/* Pulsing dot — the "live" indicator. */
const LiveDot = ({ done }) => (
  <span className="relative flex h-2 w-2">
    {!done && (
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
    )}
    <span
      className={`relative inline-flex h-2 w-2 rounded-full ${
        done ? "bg-emerald-400" : "bg-emerald-500"
      }`}
    />
  </span>
);

const Progress = ({ status }) => {
  const idx = stepIndex(status);
  return (
    <div className="flex items-center gap-1.5" aria-hidden="true">
      {STEPS.map((step, i) => (
        <span
          key={step}
          className={`h-1 flex-1 rounded-full transition-colors ${
            i <= idx ? "bg-emerald-400" : "bg-white/20"
          }`}
        />
      ))}
    </div>
  );
};

const OrderRow = ({ order }) => {
  const idx = stepIndex(order.status);
  return (
    <div className="rounded-2xl bg-white/10 p-3.5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">
            {LABEL[order.status] || order.status}
          </p>
          <p className="truncate text-xs text-white/60">
            #{order.id}
            {order.firstItemName ? ` · ${order.firstItemName}` : ""}
            {order.itemCount > 1 ? ` +${order.itemCount - 1}` : ""}
          </p>
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
          <StatusIcon status={order.status} />
        </span>
      </div>

      <div className="mt-3">
        <Progress status={order.status} />
        <div className="mt-1.5 flex justify-between text-[10px] text-white/50">
          {STEPS.map((s, i) => (
            <span key={s} className={i <= idx ? "text-white/80" : ""}>
              {s}
            </span>
          ))}
        </div>
      </div>

      {order.cancellation === "requested" && (
        <p className="mt-2 text-xs text-amber-300">
          Cancellation requested — awaiting review
        </p>
      )}
      {order.status === "Delivered" && (
        <p className="mt-2 text-xs text-emerald-300">
          Delivered — this tracker clears once our team closes the order.
        </p>
      )}
    </div>
  );
};

/**
 * Live order tracker.
 *  - Mobile: a Dynamic-Island-style pill pinned under the notch/status bar
 *    that expands on tap.
 *  - Desktop: a floating card bottom-right.
 * Appears after a successful checkout and disappears when the server closes
 * live tracking (cancellation, or admin/manager closing a delivered order).
 */
const LiveOrderTracker = () => {
  const { orders } = useLiveOrders();
  const [expanded, setExpanded] = useState(false);
  const [permission, setPermission] = useState(
    notificationsSupported() ? Notification.permission : "unsupported"
  );

  // Pop open briefly when a new order goes live, then settle to the pill.
  const newest = orders[0]?.id;
  useEffect(() => {
    if (!newest) {
      setExpanded(false);
      return undefined;
    }
    setExpanded(true);
    const t = setTimeout(() => setExpanded(false), 4500);
    return () => clearTimeout(t);
  }, [newest]);

  const askPermission = async () => {
    setPermission(await enableOrderNotifications());
  };

  const primary = orders[0];
  const showAlertsCta = permission === "default" || needsHomeScreenInstall();

  return (
    <AnimatePresence>
      {primary && (
        <>
          {/* ---------- Mobile: Dynamic-Island pill ---------- */}
          <motion.div
            key="island"
            layout
            initial={{ y: -80, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -80, opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            style={{ top: "max(env(safe-area-inset-top), 10px)" }}
            className="fixed left-1/2 z-[60] w-[calc(100vw-24px)] max-w-sm -translate-x-1/2 md:hidden"
          >
            <motion.div
              layout
              style={{ borderRadius: expanded ? 32 : 9999 }}
              className="overflow-hidden bg-black text-white shadow-2xl ring-1 ring-white/10"
            >
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                aria-label="Live order status"
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left"
              >
                <LiveDot done={primary.status === "Delivered"} />
                <span className="min-w-0 flex-1 truncate text-sm font-semibold">
                  {LABEL[primary.status] || primary.status}
                </span>
                {orders.length > 1 && (
                  <span className="rounded-full bg-white/15 px-2 text-xs">
                    +{orders.length - 1}
                  </span>
                )}
                <span className="flex w-16">
                  <Progress status={primary.status} />
                </span>
                <FiChevronDown
                  className={`transition-transform ${expanded ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-2 px-3 pb-3"
                  >
                    {orders.map((o) => (
                      <OrderRow key={o.id} order={o} />
                    ))}
                    <AlertsAndLink
                      showAlertsCta={showAlertsCta}
                      permission={permission}
                      onEnable={askPermission}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* ---------- Desktop: floating card ---------- */}
          <motion.div
            key="desktop"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-[60] hidden w-80 md:block"
          >
            <div className="overflow-hidden rounded-3xl bg-black text-white shadow-2xl ring-1 ring-white/10">
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                className="flex w-full items-center gap-3 px-4 py-3 text-left"
              >
                <LiveDot done={primary.status === "Delivered"} />
                <span className="flex-1 text-sm font-semibold">
                  Live order status
                  {orders.length > 1 ? ` (${orders.length})` : ""}
                </span>
                <FiChevronDown
                  className={`transition-transform ${expanded ? "rotate-180" : ""}`}
                />
              </button>

              {!expanded && (
                <div className="space-y-2 px-4 pb-4">
                  <p className="text-sm text-white/80">
                    {LABEL[primary.status] || primary.status} · #{primary.id}
                  </p>
                  <Progress status={primary.status} />
                </div>
              )}

              {expanded && (
                <div className="space-y-2 px-3 pb-3">
                  {orders.map((o) => (
                    <OrderRow key={o.id} order={o} />
                  ))}
                  <AlertsAndLink
                    showAlertsCta={showAlertsCta}
                    permission={permission}
                    onEnable={askPermission}
                  />
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const AlertsAndLink = ({ showAlertsCta, permission, onEnable }) => (
  <div className="space-y-2 pt-1">
    {showAlertsCta && needsHomeScreenInstall() && (
      <p className="rounded-xl bg-white/10 p-2.5 text-xs text-white/70">
        On iPhone, tap Share → “Add to Home Screen”, then open Orbit Buy
        from there to get order alerts.
      </p>
    )}
    {permission === "default" && !needsHomeScreenInstall() && (
      <button
        type="button"
        onClick={onEnable}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/15 py-2 text-xs font-semibold hover:bg-white/25"
      >
        <FiBell /> Turn on order notifications
      </button>
    )}
    <Link
      to="/orders"
      className="block rounded-xl bg-white py-2 text-center text-xs font-semibold text-black"
    >
      View my orders
    </Link>
  </div>
);

export default LiveOrderTracker;
