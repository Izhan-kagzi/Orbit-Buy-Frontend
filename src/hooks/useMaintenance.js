import { useCallback, useEffect, useState } from "react";
import api from "../services/api";

const POLL_INTERVAL_MS = 30 * 1000;

// Polls the public maintenance-status endpoint so the storefront can show
// the maintenance page the moment an admin flips the switch (or the window
// they set starts/ends), without needing to be logged in to check.
export function useMaintenanceStatus() {
  const [status, setStatus] = useState({
    checked: false,
    active: false,
    message: "",
    startTime: null,
    endTime: null,
  });

  const refresh = useCallback(() => {
    api
      .get("/settings/maintenance", { auth: false })
      .then((res) => {
        const m = res?.maintenance || {};
        setStatus({
          checked: true,
          active: Boolean(m.active),
          message: m.message || "",
          startTime: m.startTime || null,
          endTime: m.endTime || null,
        });
      })
      .catch(() => {
        // If the check itself fails, don't lock people out of the site.
        setStatus((prev) => ({ ...prev, checked: true }));
      });
  }, []);

  useEffect(() => {
    refresh();
    const interval = window.setInterval(refresh, POLL_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [refresh]);

  return status;
}

export default useMaintenanceStatus;