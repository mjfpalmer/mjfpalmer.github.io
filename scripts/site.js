window.addEventListener('load', () => {
  const base = document.querySelector('base');
  let baseUrl = base && base.href || '';
  if (!baseUrl.endsWith('/')) {
    baseUrl = `${baseUrl}/`;
  }

  window["isUpdateAvailable"] = new Promise(function (resolve, reject) {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(`${baseUrl}service-worker${baseUrl.indexOf('localhost') === -1 ? '' : '-localhost'}.js`)
        .then(registration => {
          console.info('ServiceWorker registration successful with scope: ', registration.scope);

          registration.onupdatefound = () => {
            console.warn("Service worker update found");

            const installingWorker = registration.installing;
            installingWorker.onstatechange = () => {
              switch (installingWorker.state) {
                case 'installed':
                  resolve(navigator.serviceWorker.controller ? true : false);
                  break;
              }
            };
          };
        })
        .catch(error => {
          console.error('ServiceWorker registration failed: ', error);
        });
    }
  });

  window["isUpdateAvailable"]
    .then(isAvailable => {
      if (isAvailable) {
        alert("New version available. Click Ok to reload.");
        window.location.reload(true);
      }
      return isAvailable;
    });
});