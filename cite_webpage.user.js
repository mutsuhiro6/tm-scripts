// ==UserScript==
// @name         Cite Webpage
// @namespace    https://github.com/mutsuhiro6/tm-scripts
// @version      1.0.1
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

const MAX_HISTORY_LENGTH = 10;
const HISTORY_KEY = 'citation_history';

function copyUrlAndTitle() {
    const url = location.href;
    const title = document.title;
    const text = '[] ' + title + ' - ' + url;
    updateHistory(text);
    GM_setClipboard(text);
    GM_notification({ title: 'Cited!', text: text, image: '', onclick: () => { } });
}

function bulkCopyFromHistories() {
    const histories = GM_getValue(HISTORY_KEY, undefined);
    if (!histories || histories.length < 1) {
        GM_notification({ title: 'History is empty.', text: '', image: '', onclick: () => { } });
    } else {
        GM_setClipboard(Array.from(histories).map(h => h.content).join('\n'));
        GM_notification({ title: 'Copied all history!', text: '', image: '', onclick: () => { } });
    }
}

async function updateHistory(content) {
    const timestamp = new Date().toJSON();
    const new_content = {
        timestamp: timestamp,
        content: content
    }
    const histories = await GM_getValue(HISTORY_KEY, undefined);
    if (!histories || histories.length < 1) {
        GM_setValue(HISTORY_KEY, [new_content]);
    } else {
        histories.push(new_content);
        if (histories.length > MAX_HISTORY_LENGTH) histories.shift();
        GM_setValue(HISTORY_KEY, histories);
    }
}

(function () {
    'use strict';
    document.addEventListener('keydown', (event) => {
        // ctrl + l
        if (event.ctrlKey && event.key == 'l') { event.stopPropagation(); copyUrlAndTitle(); };
        // ctrl + x
        if (event.ctrlKey && event.key == 'x') { event.stopPropagation(); bulkCopyFromHistories(); };
    });
})();
