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
    value = value.toLowerCase();
    switch (true) {
      case value.startsWith("home"): window.location.href = "/index.html"; break;
      case value.startsWith("maths"): window.location.href = "/maths/maths.html"; break;
      case value.startsWith("sean moments"): window.location.href = "/timelines/sean.html"; break;
      case value.startsWith("anika moments"): window.location.href = "/timelines/anika.html"; break;
      case value.startsWith("version"): site.respond("v231102.2040"); break;
      case value.startsWith("hi"):
      case value.startsWith("hello"):
        site.respond("Hi, how are you?");
        break;
    }
  }

  this.respond = (text) => {
    $("#ci").val(text);
    setTimeout(() => {
      if ($("#ci").val() === text) {
        $("#ci").val("");
      }
    }, 4000);
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

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

Date.prototype.toShortDate = function () {
  return `${this.getFullYear()}-${this.getMonth() + 1}-${this.getDate()}`;
}

Date.prototype.toEventDate = function () {
  let day, month;

  switch (this.getDay()) {
    case 0: day = "Sun"; break;
    case 1: day = "Mon"; break;
    case 2: day = "Tue"; break;
    case 3: day = "Wed"; break;
    case 4: day = "Thu"; break;
    case 5: day = "Fri"; break;
    case 6: day = "Sat"; break;
  }

  switch (this.getMonth()) {
    case 0: month = "Jan"; break;
    case 1: month = "Feb"; break;
    case 2: month = "Mar"; break;
    case 3: month = "Apr"; break;
    case 4: month = "May"; break;
    case 5: month = "Jun"; break;
    case 6: month = "Jul"; break;
    case 7: month = "Aug"; break;
    case 8: month = "Sep"; break;
    case 9: month = "Oct"; break;
    case 10: month = "Nov"; break;
    case 11: month = "Dec"; break;
  }

  return `${day} ${this.getDate()} ${month} ${this.getFullYear()}`;
}

/**
* Gets the first element of the array or undefined if the array is empty.
* @returns {object}
*/
Array.prototype.first = function () {
  return this.length === 0 ? undefined : this[0];
}

/**
* Gets the last element of the array or undefined if the array is empty.
* @returns {object}
*/
Array.prototype.last = function () {
  return this.length === 0 ? undefined : this[this.length - 1];
}

/**
* HTML encodes a string.
* @param {string} value - The string to HTML encode.
* @returns {string}
*/
function htmlEncode(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .replace(/é/g, '&eacute;')
    .replace(/ê/g, '&ecirc;')
    .replace(/ë/g, '&euml;')
    .replace(/\\n/g, '<br />');
}