import api from "../services/api";

const urlBase64ToUint8Array = (base64) => {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const raw = atob((base64 + padding).replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)));
};

export const notificationsSupported = () =>
  typeof window !== "undefined" &&
  "Notification" in window &&
  "serviceWorker" in navigator;

export const isIOS = () =>
  /iphone|ipad|ipod/i.test(navigator.userAgent) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

export const isStandalone = () =>
  window.matchMedia?.("(display-mode: standalone)").matches ||
  window.navigator.standalone === true;

/** iOS only delivers web notifications to a PWA added to the Home Screen. */
export const needsHomeScreenInstall = () => isIOS() && !isStandalone();

export async function getRegistration() {
  if (!("serviceWorker" in navigator)) return null;
  try {
    return await navigator.serviceWorker.register("/sw.js");
  } catch {
    return null;
  }
}

/** Subscribe this device for push (no-op if the server has no VAPID keys). */
export async function subscribeToPush() {
  const reg = await getRegistration();
  if (!reg || !("PushManager" in window)) return false;

  const { enabled, publicKey } = await api.get("/push/public-key", { auth: false });
  if (!enabled || !publicKey) return false;

  const ready = await navigator.serviceWorker.ready;
  const subscription =
    (await ready.pushManager.getSubscription()) ||
    (await ready.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey),
    }));

  await api.post("/push/subscribe", { subscription: subscription.toJSON() });
  return true;
}

/** Must be called from a click handler (iOS/Safari require a user gesture). */
export async function enableOrderNotifications() {
  if (!notificationsSupported()) return "unsupported";
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    try {
      await subscribeToPush();
    } catch {
      /* local notifications still work while the app is open */
    }
  }
  return permission;
}

/** Show a notification from the page (used when push isn't available). */
export async function showLocalNotification({ title, body, tag, url }) {
  if (!notificationsSupported() || Notification.permission !== "granted") return;
  const reg = await getRegistration();
  if (reg) {
    reg.showNotification(title, {
      body,
      tag,
      renotify: true,
      icon: "/favicon.ico",
      data: { url: url || "/orders" },
    });
  }
}

export async function closeNotification(tag) {
  const reg = await getRegistration();
  const list = (await reg?.getNotifications({ tag })) || [];
  list.forEach((n) => n.close());
}
