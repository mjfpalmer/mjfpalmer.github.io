let site;

$(function () {
  site = new Site();

  $("#ci")
    .on("keyup", site.OnConsoleKeyUp)
    .trigger("focus");
});

function Site() {
  let site = this;

  this.OnConsoleKeyUp = function (e) {
    if (e.key == 'Enter') {
      let value = $(e.target).val();
      $(e.target).val("");
      site.OnConsoleKeyUpEnter(value);
    }
  }

  this.OnConsoleKeyUpEnter = function (value) {
    switch (value.toLowerCase()) {
      case "home": window.location.href = "/index.html"; break;
      case "maths": window.location.href = "/maths.html"; break;
      case "version": alert("v231102.1430"); break;
    }
  }
}

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