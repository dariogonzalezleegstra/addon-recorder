//require('webextension-polyfill');

browser.runtime.onMessage.addEventListener((request, sender) => {
    console.info('contentscript', request, sender);
    console.log('llego');
    alert('asdsa');
});