const feather = require('feather-icons');

// Initialize Feather Icons in all windows
function initializeFeather() {
  feather.replace({
    class: 'feather-icon',
    'stroke-width': 2,
    width: 24,
    height: 24
  });
}

document.addEventListener('DOMContentLoaded', initializeFeather);

// Re-initialize icons when webviews load
document.querySelectorAll('webview').forEach(webview => {
  webview.addEventListener('dom-ready', () => {
    webview.executeJavaScript(`
      if(typeof feather !== 'undefined') {
        feather.replace({
          class: 'feather-icon',
          'stroke-width': 2,
          width: 24,
          height: 24
        });
      }
    `);
  });
});