// Self-destroying service worker ("kill switch").
//
// Hintergrund: Die frühere Seite hatte unter /sw.js einen Workbox-Precache-
// Service-Worker registriert. Beim Relaunch wurde sw.js entfernt -> der alte
// SW blieb bei wiederkehrenden Besuchern aktiv und lieferte die alte Seite aus.
//
// Beim nächsten Update-Check ersetzt der Browser den alten SW durch diesen.
// Er löscht alle Caches, deregistriert sich selbst und lädt offene Tabs neu,
// sodass danach wieder direkt vom Netzwerk (die aktuelle Seite) geladen wird.
//
// Sobald alle wiederkehrenden Besucher bereinigt sind, kann diese Datei
// entfernt werden. Die aktuelle Seite registriert selbst keinen SW.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // alle vom alten SW angelegten Caches löschen
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));

      // diesen Service Worker deregistrieren
      await self.registration.unregister();

      // offene Fenster neu laden -> frische Inhalte ohne SW
      const clients = await self.clients.matchAll({ type: 'window' });
      for (const client of clients) {
        client.navigate(client.url);
      }
    })()
  );
});
