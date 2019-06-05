//require('webextension-polyfill');

browser.browserAction.onClicked.addListener(function () {
    getCurrentTab(function (tab) {
        browser.tabs.sendMessage(tab.id, {
            "call": "open"
        });
    });
});



function getCurrentTab (callback) {
    try {
        browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
            callback(tabs[0]);
    });
    }
    catch (err) {
        console.log("exception");
        console.log(err);
    }
}