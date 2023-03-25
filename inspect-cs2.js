// ==UserScript==
// @name         CS2 Inspect
// @version      1.0
// @description  Steam Inventory inspect CS2 Items command generator
// @match        *://steamcommunity.com/*/inventory/*
// @grant        none
// @author       github.com/Ar1i
// ==/UserScript==

(function() {
  'use strict';

  let observer;

  function addButton(itemActions) {
    if (itemActions.querySelector('#cs2inspect')) {
      return;
    }

    const aTag = itemActions.querySelector("a");
    if (!aTag) {
      return;
    }
    
    const hrefValue = aTag.getAttribute("href");

    const regexApp = /rungame\/(\d+)\//;
    const appId = regexApp.exec(hrefValue);
    if (!appId || appId[1] != 730) {
      return;
    }

    const regexId = /csgo_econ_action_preview%20(\w+)/;
    const item = "csgo_econ_action_preview " + regexId.exec(hrefValue)?.[1];

    const inspButton = document.createElement('button');
    inspButton.id = 'cs2inspect';
    inspButton.innerText = 'CS2 Inspect';
    itemActions.appendChild(inspButton);

    const cmdText = document.createElement('div');
    cmdText.innerText = item;
    cmdText.style.display = 'none';
    itemActions.appendChild(cmdText);

    inspButton.addEventListener('click', () => {
      inspButton.style.display = 'none';
      cmdText.style.display = 'block';
    });

    cmdText.addEventListener('click', () => {
      const range = document.createRange();
      range.selectNodeContents(cmdText);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    });
  }

  function addButtons() {
    const itemActionsList = document.querySelectorAll('.item_actions');
    itemActionsList.forEach(addButton);
  }

  addButtons();

  observer = new MutationObserver(() => {
    addButtons();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

})();
