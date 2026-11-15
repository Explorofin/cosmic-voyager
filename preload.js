/* Cosmic Voyager — web/itch trial preloader.
 * Downloads EVERY image the game uses up front (byte-accurate progress bar),
 * keeps every image alive in memory (cached), then boots game.js.
 * game.js resolves "assets/..." paths through window.CV_PRELOAD.url() (logical .png -> shipped file), so no
 * art is fetched mid-play and missing optional art resolves instantly (no 404 probes).
 */
(function () {
  "use strict";
  var M = window.CV_ASSET_MANIFEST || { files: [], totalBytes: 0 };
  var files = M.files || [];
  var total = M.totalBytes || 0;
  var byLogical = Object.create(null);
  var loadedBytes = 0, doneFiles = 0, failed = [];
  var CONCURRENCY = 8, RETRIES = 3;

  for (var i = 0; i < files.length; i++) {
    var f = files[i];
    byLogical[f.p] = f;
    if (f.alias) for (var a = 0; a < f.alias.length; a++) byLogical[f.alias[a]] = f;
  }

  window.CV_PRELOAD = {
    ready: false,
    /* Returns a URL for a logical asset path, or null if the build doesn't ship it. */
    url: function (p) {
      if (typeof p !== "string") return p;
      var q = p.replace(/^\.\//, "").split("?")[0];
      var f = byLogical[q];
      if (!f) return q.indexOf("assets/") === 0 ? null : p;
      return f.u;
    },
    has: function (p) { return !!byLogical[String(p || "").replace(/^\.\//, "")]; },
    stats: function () { return { files: files.length, totalBytes: total, loadedBytes: loadedBytes, doneFiles: doneFiles, failed: failed.slice() }; }
  };

  function $(id) { return document.getElementById(id); }
  function mb(n) { return (n / 1048576).toFixed(n > 104857600 ? 0 : 1); }
  var lastPaint = 0;
  function paint(force) {
    var now = Date.now();
    if (!force && now - lastPaint < 80) return;
    lastPaint = now;
    var frac = total > 0 ? loadedBytes / total : (files.length ? doneFiles / files.length : 1);
    frac = Math.max(0, Math.min(1, frac));
    var shown = frac * 0.9; /* last 10% = game decoding its essential art */
    var fill = $("loadFill"); if (fill) fill.style.width = (shown * 100).toFixed(1) + "%";
    var pct = $("loadPct"); if (pct) pct.textContent = Math.floor(shown * 100) + "%";
    var st = $("loadStatus");
    if (st) st.textContent = "Downloading art " + doneFiles + " / " + files.length + " \u00b7 " + mb(loadedBytes) + " / " + mb(total) + " MB";
  }

  /* Load each asset as an <img> and keep it alive: bytes land in the HTTP + in-memory
   * image cache, so game.js's own new Image(sameUrl) resolves instantly with no network.
   * (Blob URLs were avoided: Chrome caps blob storage and ~700 MB of art can exceed it.) */
  var keep = window.CV_PRELOAD_IMAGES = Object.create(null);
  function fetchOne(f, attempt) {
    return new Promise(function (resolve) {
      var im = new Image();
      im.decoding = "async";
      im.onload = function () { keep[f.u] = im; loadedBytes += f.b; resolve(); };
      im.onerror = function () {
        if (attempt < RETRIES) { setTimeout(function () { fetchOne(f, attempt + 1).then(resolve); }, 400 * (attempt + 1)); return; }
        failed.push(f.u); loadedBytes += f.b;
        try { console.warn("preload failed", f.u); } catch (e) {}
        resolve();
      };
      im.src = f.u;
    });
  }

  function run() {
    paint(true);
    var next = 0;
    var t0 = Date.now();
    function worker() {
      if (next >= files.length) return Promise.resolve();
      var f = files[next++];
      return fetchOne(f, 0).then(function () { doneFiles++; paint(false); return worker(); });
    }
    var ws = [];
    for (var k = 0; k < CONCURRENCY; k++) ws.push(worker());
    Promise.all(ws).then(function () {
      paint(true);
      window.CV_PRELOAD.ready = true;
      window.CV_PRELOAD.seconds = (Date.now() - t0) / 1000;
      var st = $("loadStatus");
      if (st) st.textContent = failed.length ? ("Art ready (" + failed.length + " file(s) will retry from network)") : "Art ready \u2014 warming up\u2026";
      var s = document.createElement("script");
      s.src = "game.js";
      document.body.appendChild(s);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  else run();
})();
