// ==UserScript==
// @name         Cite Webpage
// @namespace    https://github.com/mutsuhiro6/tm-scripts
// @version      1.1
// @description  Copy title and URL of showing webpage.
// @author       mutsuhiro6
// @updateURL    https://raw.githubusercontent.com/mutsuhiro6/tm-scripts/main/cite_webpage.user.js
// @downloadURL  https://raw.githubusercontent.com/mutsuhiro6/tm-scripts/main/cite_webpage.user.js
// @match        *://*/*
// @grant        GM_setClipboard
// @grant        GM_notification
// ==/UserScript==

function copyUrlAndTitle() {
    const url = location.href
    const title = document.title
    const text = title + ' - ' + url
    GM_setClipboard(text)
    GM_notification({ title: 'Copied!', text: text, timeout: 1500 })
}

(() => {
    'use strict'
    document.addEventListener('keydown', (e) => {
        // ctrl + l
        if (e.ctrlKey && e.key == 'l') { e.stopPropagation(); copyUrlAndTitle() }
    })
})()
