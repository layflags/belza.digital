importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

const __precacheAndRoute = xs =>
  xs.map(({ url, revision }) =>
    ({
      url: url.replace('index.html', '/').replace(/\.html$/, ''),
      revision
    })
  );

workbox.precaching.precacheAndRoute(__precacheAndRoute([]), {});
