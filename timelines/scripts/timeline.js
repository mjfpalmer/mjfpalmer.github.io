let timeline;
let data;

function init() {
  delete timeline;
  timeline = new Timeline(data, $('#navCategories'));
}

function Timeline(data, navCategories) {
  this.data = data;
  this.eventDates = [];
  this.eventDatesLength = 0;
  this.visibleCategories = 0;
  this.timelineContainer = null;
  this.timelineContainerHeight = 0;
  this.scrollContainer = null;
  this.scrollContainerHeight = 0;
  this.scroller = null;
  this.scrollerDragging = false;
  this.scrollHeight = 0;
  this.container = null;
  this.totalHeight = 0;
  this.visibleEventDates = [];
  this.navCategories = navCategories;
  this.years = [];

  this.init = function () {
    let tl = this;
    $('#spinner').show();
    this.initTimeline();

    setTimeout(function () {
      tl.initData();
      tl.initScrolling();
      $('#spinner').hide();
      tl.draw(true);
    }, 1);
  };

  this.initTimeline = function () {
    $('.timelineContainer').remove();
    $('.scrollContainer').remove();

    this.timelineContainer = $(document.createElement('div')).appendTo('#app').addClass('timelineContainer');
    this.container = $(document.createElement('div')).appendTo(this.timelineContainer);
    this.timelineContainerHeight = $('.timelineContainer').innerHeight();
  };

  this.initData = function () {
    let tl = this;

    if (!this.data.initialised) {
      this.data.eventDates = [];

      this.data.events.forEach(event => { event.date = new Date(event.date); });
      this.data.events.sort((a, b) => b.date.getTime() - a.date.getTime());

      let eventDate = null;
      this.data.events.forEach(event => {
        let id = event.date.getTime();

        if (eventDate === null || eventDate.id !== id) {
          eventDate = {
            date: event.date,
            id: id,
            categories: 0,
            events: []
          };
          this.data.eventDates.push(eventDate);
        }

        event.index = eventDate.events.length;
        event.categoryId = tl.navCategories.find(`span.cat-${event.category}`).attr('value');
        eventDate.categories |= event.categoryId;
        event.body = htmlEncode(event.body);
        eventDate.events.push(event);
      });

      this.data.events = null;
      this.data.initialised = true;
    }

    this.navCategories.find('span.cat-selected').each((i, category) => this.visibleCategories |= $(category).attr('value'));

    this.eventDates = this.data.eventDates.filter(eventDate => this.visibleCategories & eventDate.categories);
    this.eventDatesLength = this.eventDates.length;

    this.eventDates.forEach((eventDate, indexEventDate) => {
      eventDate.index = indexEventDate;
      eventDate.top = this.totalHeight;
      eventDate.container = $(document.createElement('div')).appendTo(this.container).addClass("px-3 pb-3").prop({ eventDate: eventDate });

      $(document.createElement('h6')).appendTo(eventDate.container).addClass('text-white').text(eventDate.date.toEventDate());

      eventDate.events.forEach((event) => {
        if (this.visibleCategories & event.categoryId) {
          $(document.createElement('div')).appendTo(eventDate.container)
            .addClass(`shadow p-3 ${event.index === 0 ? '' : 'mt-3'} rounded event`)
            .html(`<img src="images/categories/${event.category}.png" class="icon24" />&nbsp;${event.body}`);
        }
      });

      eventDate.height = eventDate.container.innerHeight();
      eventDate.bottom = eventDate.top + eventDate.height;
      this.totalHeight += eventDate.height;

      if (!this.years.find((year => year.year === eventDate.date.getFullYear()))) {
        this.years.push({ year: eventDate.date.getFullYear(), top: eventDate.top });
      }
    });

    this.container.empty();
  };

  this.initScrolling = function () {
    let tl = this;

    this.scrollContainer = $(document.createElement('div')).appendTo('body').addClass('scrollContainer');
    this.scroller = $(document.createElement('div')).appendTo(this.scrollContainer).addClass('bg-secondary opacity-75 scroller');
    $(document.createElement('img')).appendTo(this.scroller).attr({ src: '/images/elements/scroll-y.png' }).css({ height: '20px', width: '20px' });

    this.scrollContainerHeight = this.scrollContainer.innerHeight();
    this.scrollHeight = this.scrollContainerHeight - this.scroller.innerHeight();

    this.timelineContainer.scroll(() => { tl.timelineContainerScroll(); });

    this.scroller
      .draggable({
        axis: "y",
        containment: "parent",
        drag: function (event, ui) { tl.scrollerDrag(ui); },
        start: function () { tl.scrollerStart(); },
        stop: function () { tl.scrollerStop(); },
      });

    for (let iYear = 0; iYear < this.years.length; iYear++) {
      let year = this.years[iYear];
      let topPercent = (1 / this.totalHeight) * year.top;
      year.top = this.scrollHeight * topPercent;
      if (iYear > 0) { year.top = Math.max(year.top, this.years[iYear - 1].bottom + 2); }

      let yearSpan = $(document.createElement('span')).appendTo(this.scrollContainer)
        .addClass("badge rounded-pill bg-secondary year")
        .css({ position: 'absolute', top: `${year.top}px` })
        .text(year.year)
        .hide();

      year.height = yearSpan.innerHeight();
      year.bottom = year.top + year.height;
    }
  };

  this.draw = function (isInitialising) {
    if (this.eventDatesLength > 0) {
      let visibleTop = this.timelineContainer.scrollTop();
      let visibleBottom = this.timelineContainer.scrollTop() + this.timelineContainerHeight;

      let visibleEventDates = this.getEventDatesToRender(visibleTop, visibleBottom, 2);

      if (!this.eventDatesEqual(this.visibleEventDates, visibleEventDates)) {
        this.visibleEventDates = visibleEventDates;
        this.container.empty();

        if (this.visibleEventDates.length > 0) {
          if (isInitialising) { this.container.hide(); }

          $(document.createElement('div')).appendTo(this.container).css({ height: `${this.visibleEventDates.first().top}px` });
          for (let eventDate of this.visibleEventDates) {
            eventDate.container.appendTo(this.container);
          }
          $(document.createElement('div')).appendTo(this.container).css({ height: `${this.totalHeight - this.visibleEventDates.last().bottom}px` });

          if (isInitialising) { this.container.fadeIn(); }
        }
      }
    }
  };

  /**
  * Gets the event dates to render.
  * @param {number} visibleTop - The top scroll position.
  * @param {number} visibleBottom - The bottom scroll position.
  * @param {number} buffer - The number of events above and below the current visible to render.
  * @returns {object[]}
  */
  this.getEventDatesToRender = function (visibleTop, visibleBottom, buffer) {
    let firstIndex = this.getFirstVisibleIndex(visibleTop, 0, this.eventDatesLength - 1);
    let lastIndex = this.getLastVisibleIndex(visibleBottom, 0, this.eventDatesLength - 1);

    return this.eventDates.slice(
      Math.max(firstIndex - buffer, 0),
      Math.min(lastIndex + buffer, this.eventDatesLength - 1) + 1);
  }

  /**
  * Get the index of the first visible event date using binary search.
  * @param {number} visibleTop - The top scroll position.
  * @param {number} start - The start position.
  * @param {number} end - The end position.
  * @returns {number}
  */
  this.getFirstVisibleIndex = function (visibleTop, start, end) {
    let mid = Math.floor((start + end) / 2);
    // console.log([start, mid, end]);
    if (start >= end) { return mid; }

    let eventDate = this.eventDates[mid];
    if (eventDate.top <= visibleTop && eventDate.bottom >= visibleTop) {
      return mid;
    } else {
      return this.getFirstVisibleIndex(visibleTop, eventDate.top < visibleTop ? mid + 1 : start, eventDate.top < visibleTop ? end : mid - 1);
    }
  };

  /**
  * Get the index of the last visible event date using binary search.
  * @param {number} visibleTop - The top scroll position.
  * @param {number} start - The start position.
  * @param {number} end - The end position.
  * @returns {number}
  */
  this.getLastVisibleIndex = function (visibleBottom, start, end) {
    let mid = Math.floor((start + end) / 2);
    //console.log([start, mid, end]);
    if (start >= end) { return mid; }

    let eventDate = this.eventDates[mid];
    if (eventDate.top <= visibleBottom && eventDate.bottom >= visibleBottom) {
      return mid;
    } else {
      return this.getLastVisibleIndex(visibleBottom, eventDate.top < visibleBottom ? mid + 1 : start, eventDate.top < visibleBottom ? end : mid - 1);
    }
  };

  /**
  * Gets a value indicating whether the supplied arrays of events dates contain the same start and end elements.
  * @param {object[]} eventDates1 - The first array of events.
  * @param {object[]} eventDates2 - The second array of events.
  * @returns {boolean}
  */
  this.eventDatesEqual = function (eventDates1, eventDates2) {
    return eventDates1.length === eventDates2.length
      && eventDates1.first().id === eventDates2.first().id
      && eventDates1.last().id === eventDates2.last().id;
  };

  this.timelineContainerScroll = function () {
    if (!this.scrollerDragging) {
      let scrollPercent = (1 / (this.totalHeight - this.scrollHeight)) * this.timelineContainer.scrollTop();
      let scrollerTop = this.scrollHeight * scrollPercent;
      this.scroller.css({ top: `${scrollerTop}px` });
    }
    this.draw();
  }

  this.scrollerDrag = function (ui) {
    let scrollPercent = (1 / this.scrollHeight) * ui.position.top;
    this.timelineContainer.scrollTop((this.totalHeight - this.scrollHeight) * scrollPercent);
  }

  this.scrollerStart = function () {
    this.scrollerDragging = true;
    this.scrollContainer.find("span.year").fadeTo(200, 0.75);
  }

  this.scrollerStop = function () {
    this.scrollContainer.find("span.year").fadeTo(500, 0);
    this.scrollerDragging = false;
  }

  this.init();
}

$(function () {
  $('#navCategories').find('span').each((i, e) => {
    let span = $(e);
    span.addClass('cat-selected').click(() => {
      if (span.hasClass('cat-selected')) {
        if ($('#navCategories').find('span.cat-selected').length === $('#navCategories').find('span').length) {
          $('#navCategories').find('span').removeClass('cat-selected').addClass('cat-deselected');
          span.removeClass('cat-deselected').addClass('cat-selected');
        } else {
          span.removeClass('cat-selected').addClass('cat-deselected');
        }
      } else {
        span.removeClass('cat-deselected').addClass('cat-selected');
      }
      init();
    });
  });
});

$(window).resize(init);