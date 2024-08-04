// ==UserScript==
// @name         pg_abroad
// @namespace    https://github.com/mutsuhiro6/tm-scripts
// @version      1.0
// @description  Add link to move PostgreSQL documents between Global and JP.
// @author       mutsuhiro6
// @icon         https://icons.duckduckgo.com/ip2/www.postgresql.org.ico
// @updateURL    https://raw.githubusercontent.com/mutsuhiro6/tm-scripts/main/postgres_doc_jp_link.user.js
// @downloadURL  https://raw.githubusercontent.com/mutsuhiro6/tm-scripts/main/postgres_doc_jp_link.user.js
// @match        https://www.postgresql.org/docs/*
// @match        https://www.postgresql.jp/document/*
// @grant        GM_registerMenuCommand
// @grant        GM_openInTab
// ==/UserScript==

function gena(href, text) {
  return '<a href="' + href + '" target="_blank" rel="noopener noreferrer">' + text + '</a>'
}

(async () => {
  'use strict'
  // URL is assumed like "https://www.postgresql.org/docs/14/history.html" or "https://www.postgresql.jp/document/14/html/history.html"
  // so path will be ['', 'docs', '14', 'history.html'] or ['', 'document', '14', 'html', 'history.html'].
  const path = document.location.pathname.split('/')
  // Avoid some error
  if (path.length < 4) return
  const version = path[2] // current, 14...
  const file = path.slice(-1)[0] // history.html, index.html...
  if (location.host == 'www.postgresql.org') {
    const url = 'https://www.postgresql.jp/document/' + version + '/html/' + file + location.hash
    GM_registerMenuCommand('🇯🇵', () => { GM_openInTab(url, { active: true, insert: true, setParent: true }) }, { accessKey: 'a' })
    const elm = '<div class="row"><div class="col-12">Japanese Version: ' + gena(url, '🇯🇵') + '</div></div>'
    document.querySelector('#pgContentWrap > div.row > div.col-md-6.mb-2').insertAdjacentHTML('beforeend', elm)
  } else if (location.host == 'www.postgresql.jp') {
    const url = 'https://www.postgresql.org/docs/' + version + '/' + file + location.hash
    GM_registerMenuCommand('🐘', () => { GM_openInTab(url, { active: true, insert: true, setParent: true }) }, { accessKey: 'a' })
    const elm = '<span class="label">' + gena(url, '🐘') + '|' + '</span>'
    document.querySelector('#docContent > div.versions').insertAdjacentHTML('afterbegin', elm)
  }
})()