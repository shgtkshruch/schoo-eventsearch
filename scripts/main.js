(function() {
  'use strict';
  var eventList, formatDate, searchEvents, searchForm, searchInput, showEvents;

  searchForm = document.getElementById('search-form');

  searchInput = document.getElementById('search-input');

  eventList = document.getElementById('event-list');

  searchEvents = function(event) {
    var keyword, script;
    event.preventDefault();
    keyword = searchInput.value;
    if (!keyword) {
      return;
    }
    keyword = keyword.replace(/[ \s]/g, ',');
    eventList.innerHTML = '<li>Searching...</li>';
    script = document.createElement('script');
    script.src = 'http://api.atnd.org/events/?format=jsonp&keyword=' + keyword;
    document.body.appendChild(script);
    return document.body.removeChild(script);
  };

  showEvents = function(data) {
    eventList.innerHTML = '';
    if (data && data.events instanceof Array) {
      return data.events.forEach(function(eventData) {
        var a, eventInfo, li, time;
        eventInfo = eventData.event;
        li = document.createElement('li');
        time = document.createElement('time');
        time.textContent = formatDate(eventInfo.started_at);
        a = document.createElement('a');
        a.href = encodeURI(eventInfo.event_url);
        a.target = '_blank';
        a.textContent = eventInfo.title;
        li.appendChild(time);
        li.appendChild(a);
        return eventList.appendChild(li);
      });
    }
  };

  formatDate = function(dateString) {
    var date;
    date = new Date(dateString);
    return (date.getMonth() + 1) + '/' + date.getDate();
  };

  searchForm.addEventListener('submit', searchEvents);

  window.callback = showEvents;

}).call(this);
