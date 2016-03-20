(() => {
  'use strict';

  var searchForm = document.getElementById('search-form');
  var searchInput = document.getElementById('search-input');
  var eventList = document.getElementById('event-list');

  var searchEvents = event => {
    event.preventDefault();
    var keyword = searchInput.value;

    if (!keyword) {
      return;
    }

    // 空白をカンマに変換して複数キーワードに対応
    var keyword = keyword.replace(/[ \s]/g, ',');

    eventList.innerHTML = '<li>Searching...</li>';

    var script = document.createElement('script');
    script.src = 'http://api.atnd.org/events/?format=jsonp&keyword=' + keyword;
    document.body.appendChild(script);
    document.body.removeChild(script);
  };

  var showEvents = data => {
    eventList.innerHTML = '';

    if (data && data.events instanceof Array) {
      data.events.forEach(eventData => {
        var eventInfo = eventData.event;

        var li = document.createElement('li');
        var time = document.createElement('time');
        time.textContent = formatDate(eventInfo.started_at);
        var a = document.createElement('a');
        a.href = encodeURI(eventInfo.event_url);
        a.target = '_blank';
        a.textContent = eventInfo.title;
        li.appendChild(time);
        li.appendChild(a);
        eventList.appendChild(li);
      });
    }
  };

  var formatDate = dateString => {
    var date = new Date(dateString);
    return (date.getMonth() + 1) + '/' + date.getDate();
  };

  searchForm.addEventListener('submit', searchEvents);
  window.callback = showEvents;
})();
