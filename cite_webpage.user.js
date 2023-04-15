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
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

const MAX_HISTORY_LENGTH = 20
const HISTORY_KEY = 'citation_history'

function copyUrlAndTitle() {
    const url = location.href
    const title = document.title
    const text = title + ' - ' + url
    updateHistory(text)
    GM_setClipboard(text)
    GM_notification({ title: 'Copied!', text: text, timeout: 1500 })
}

async function updateHistory(content) {
    const timestamp = new Date().toJSON()
    const new_content = {
        timestamp: timestamp,
        content: content
    }
    const histories = await GM_getValue(HISTORY_KEY, undefined)
    if (!histories || histories.length < 1) {
        GM_setValue(HISTORY_KEY, [new_content])
    } else {
        histories.push(new_content)
        if (histories.length > MAX_HISTORY_LENGTH) histories.shift()
        GM_setValue(HISTORY_KEY, histories)
    }
}

(() => {
    'use strict'
    document.addEventListener('keydown', (e) => {
        // ctrl + l
        if (e.ctrlKey && e.key == 'l') { e.stopPropagation(); copyUrlAndTitle() }
    })
})()
