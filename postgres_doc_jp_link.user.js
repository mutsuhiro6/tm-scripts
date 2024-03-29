// ==UserScript==
// @name         PostgreSQL Document Localization Link
// @namespace    https://github.com/mutsuhiro6/tm-scripts
// @version      1.1
// @description  Add link to PostgreSQL JP-localized documents.
// @author       mutsuhiro6
// @icon         https://www.google.com/s2/favicons?domain=postgresql.org&sz=256
// @updateURL    https://raw.githubusercontent.com/mutsuhiro6/tm-scripts/main/postgres_doc_jp_link.user.js
// @downloadURL  https://raw.githubusercontent.com/mutsuhiro6/tm-scripts/main/postgres_doc_jp_link.user.js
// @match        https://www.postgresql.org/docs/*
// @match        https://www.postgresql.jp/document/*
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        GM_openInTab
// @grant        GM_log
// @connect      www.postgresql.org
// @connect      www.postgresql.jp
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
    GM_xmlhttpRequest({
      method: 'HEAD',
      url: url,
      onload: async (r) => {
        if (r.status == 200) {
          GM_log(url + ' is available.')
          GM_registerMenuCommand('Move to JA', () => { GM_openInTab(url, { active: true, insert: true, setParent: true }) }, { accessKey: 'j' })
          const elm = '<div class="row"><div class="col-12">Japanese Version: ' + gena(url, '🇯🇵') + '</div></div>'
          document.querySelector('#pgContentWrap > div.row > div.col-md-6.mb-2').insertAdjacentHTML('beforeend', elm)
        } else {
          GM_log(url + ' is unavailable.')
        }
      }
    })
  } else if (location.host == 'www.postgresql.jp') {
    const url = 'https://www.postgresql.org/docs/' + version + '/' + file + location.hash
    GM_xmlhttpRequest({
      method: 'HEAD',
      url: url,
      onload: async (r) => {
        if (r.status == 200) {
          GM_log(url + ' is available.')
          GM_registerMenuCommand('Move to EN', () => { GM_openInTab(url, { active: true, insert: true, setParent: true }) }, { accessKey: 'e' })
          const elm = '( <span class="other">' + gena(url, '🐘') + '</span> )'
          document.querySelector('#docContent > div.versions > span.list').insertAdjacentHTML('afterbegin', elm)
        } else {
          GM_log(url + ' is unavailable.')
        }
      }
    })
  }
})()