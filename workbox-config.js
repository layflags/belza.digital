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
  "swSrc": "src/sw.js",
  "swDest": "build/sw.js"
};
