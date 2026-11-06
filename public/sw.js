/* Orbit Buy service worker — order notifications (Web Push).
   Lives at the site root so it can control the whole origin. */

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = { title: "Orbit Buy", body: event.data ? event.data.text() : "" };
  }

  // Live tracking closed: remove the lingering notification, show nothing.
  if (data.type === "order:live-closed") {
    event.waitUntil(
      self.registration
        .getNotifications({ tag: data.tag })
        .then((list) => list.forEach((n) => n.close()))
    );
    return;
  }

  event.waitUntil(
    self.registration.showNotification(data.title || "Orbit Buy", {
      body: data.body || "",
      tag: data.tag, // same order => replaces the previous notification
      renotify: true,
      icon: "/favicon.ico",
      badge: "/favicon.ico",
      data: { url: data.url || "/orders" },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || "/orders";

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const client of list) {
        if ("focus" in client) {
          client.navigate(url);
          return client.focus();
        }
      }
      return self.clients.openWindow(url);
    })
  );
});
