module.exports = {
  "globDirectory": "build/",
  "globPatterns": [
    "**/*.{css,html,jpg,js,png,xml,mp4,ico,json,svg}"
  ],
  "globIgnores": [
    "**/_variables.css",
    "**/cloudy.mp4",
    "**/safari-pinned-tab.svg",
    "**/404.*"
  ],
  "manifestTransforms": [
    originalManifest => ({
      manifest: originalManifest.map(entry => ({
        ...entry,
        // NOTE: remove ".html" from urls to prevent issues with firebase
        //       redirects by option "cleanUrls"
        url: entry.url.replace('index.html', '/').replace(/\.html$/, ''),
      })),
      warnings: [],
    })
  ],
  "swDest": "build/sw.js",
  "offlineGoogleAnalytics": true
};
