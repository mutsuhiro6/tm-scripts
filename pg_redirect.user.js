// ==UserScript==
// @name         pg_redirect
// @namespace    https://github.com/mutsuhiro6/tm-scripts
// @version      1.1
// @description  Auto jump to version selectable PostgreSQL JP document.
// @author       mutsuhiro6
// @icon         https://icons.duckduckgo.com/ip2/www.postgresql.org.ico
// @updateURL    https://raw.githubusercontent.com/mutsuhiro6/tm-scripts/main/pg_redirect.user.js
// @downloadURL  https://raw.githubusercontent.com/mutsuhiro6/tm-scripts/main/pg_redirect.user.js
// @match        https://www.postgresql.jp/docs/*
// @run-at       document-start
// ==/UserScript==

(async () => {
  'use strict'
  // URL is assumed like "https://www.postgresql.jp/docs/14/history.html"     
  // so path will be ['', 'docs', '14', 'history.html'] or ['', 'document', '14', 'html', 'history.html'].
  const path = window.location.pathname.split('/')
  // Avoid some error
  if (path.length < 4) return
  const version = path[2] // current, 14...
  const file = path.slice(-1)[0] // history.html, index.html...
  const url = 'https://www.postgresql.jp/document/' + version + '/html/' + file + location.hash
  window.location.replace(url);
})