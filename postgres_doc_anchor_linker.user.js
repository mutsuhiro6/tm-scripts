// ==UserScript==
// @name         Postgres doc anchor linker
// @namespace    https://github.com/mutsuhiro6/tm-scripts
// @version      1.1
// @description  Cite anchor link of Postgres document.
// @author       mutsuhiro6
// @updateURL    https://raw.githubusercontent.com/mutsuhiro6/tm-scripts/main/postgres_doc_anchor_linker.user.js
// @downloadURL  https://raw.githubusercontent.com/mutsuhiro6/tm-scripts/main/postgres_doc_anchor_linker.user.js
// @match        https://www.postgresql.jp/document/*
// @match        https://www.postgresql.org/docs/*
// @icon         https://icons.duckduckgo.com/ip2/www.postgresql.org.ico
// @grant        GM_addStyle
// @grant        GM_setClipboard
// @grant        GM_notification
// ==/UserScript==

(() => {
    'use strict'
    const url = location.origin + location.pathname
    const title = document.querySelector('h2').innerText

    // Decorate sub-section titles
    GM_addStyle('h3:hover {text-decoration: underline; cursor: pointer;}')
    Array.from(document.querySelectorAll('div.sect2'))
        .forEach(e => {
            const hash = '#' + e.id
            const sectionTitle = e.querySelector('h3').innerText
            const copyText = sectionTitle + ' | ' + title + ' - ' + url + hash
            e.querySelector('h3').addEventListener('click', () => {
                GM_setClipboard(copyText)
                GM_notification({ title: sectionTitle, text: url + hash, timeout: 1500 })
            })
        })

    // Decorate variables
    GM_addStyle('.variablelist dt:hover {text-decoration: underline; cursor: pointer;}')
    Array.from(document.querySelectorAll('div.variablelist'))
        .flatMap(e => Array.from(e.querySelectorAll('dt')))
        .forEach(e => {
            const hash = '#' + e.id
            const varName = e.querySelector('.varname').innerText
            const copyText = varName + ' - ' + url + hash
            e.addEventListener('click', () => {
                GM_setClipboard(copyText)
                GM_notification({ title: varName, text: url + hash, timeout: 1500 })
            })
        })
})()