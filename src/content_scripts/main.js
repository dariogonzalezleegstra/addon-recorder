//require('webextension-polyfill');

browser.runtime.onMessage.addListener((request, sender) => {
    console.info('contentscript', request, sender);
    console.log('llego');
});