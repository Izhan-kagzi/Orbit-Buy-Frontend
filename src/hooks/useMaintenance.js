import { useCallback, useEffect, useRef, useState } from "react";
import api from "../services/api";

// Keep this short so maintenance starts/stops quickly even when the browser
// is already open. We also schedule an exact refresh at start/end times.
const POLL_INTERVAL_MS = 5 * 1000;

export function useMaintenanceStatus() {
  const [status, setStatus] = useState({
    checked: false,
    active: false,
    enabled: false,
    message: "",
    startTime: null,
    endTime: null,
  });

  const timerRef = useRef(null);

  const clearScheduledRefresh = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const refresh = useCallback(async () => {
    try {
      const res = await api.get("/settings/maintenance", { auth: false });
      const m = res?.maintenance || {};

      setStatus({
        checked: true,
        active: Boolean(m.active),
        enabled: Boolean(m.enabled),
        message: m.message || "",
        startTime: m.startTime || null,
        endTime: m.endTime || null,
      });

      // Schedule an exact status refresh around the next maintenance
      // boundary so users don't have to wait for the polling interval.
      clearScheduledRefresh();

      const now = Date.now();
      const boundaries = [m.startTime, m.endTime]
        .filter(Boolean)
        .map((value) => new Date(value).getTime())
        .filter((value) => Number.isFinite(value) && value > now);

      if (boundaries.length) {
        const nextBoundary = Math.min(...boundaries);
        timerRef.current = window.setTimeout(() => {
          refresh();
        }, Math.max(250, nextBoundary - now + 250));
      }
    } catch {
      // A temporary status-check failure should not lock customers out.
      setStatus((prev) => ({ ...prev, checked: true }));
    }
  }, [clearScheduledRefresh]);

  useEffect(() => {
    refresh();

    const interval = window.setInterval(refresh, POLL_INTERVAL_MS);

    const handleVisibility = () => {
      if (document.visibilityState === "visible") refresh();
    };

    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", handleVisibility);
      clearScheduledRefresh();
    };
  }, [refresh, clearScheduledRefresh]);

  return status;
}

export default useMaintenanceStatus;
