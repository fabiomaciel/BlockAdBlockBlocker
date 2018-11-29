"use strict";

function blockBlocker() {
  const MAX_TRIES = 10;
  const TIME_BEETWEEN_TRY = 1000;

  var tries = 0;

  function verifyAdblockBlocker() {
    tries += 1;
    var div = document.querySelector("#detecta-adblock");
    if (div) {
      div.parentNode.removeChild(div);
      document.querySelector("body").style.overflow = "scroll";
      console.log("BLOCKED!")
    }
    if (tries < MAX_TRIES) return setTimeout(verifyAdblockBlocker, TIME_BEETWEEN_TRY);
  }

  verifyAdblockBlocker();
}

chrome.webNavigation.onCompleted.addListener(function(details) {
  if(details.url.indexOf("chrome://") == -1) 
    chrome.tabs.executeScript({
      code: blockBlocker.toString() + ";blockBlocker();"
    });
});
