'use strict'

searchForm = document.getElementById 'search-form'
searchInput = document.getElementById 'search-input'
eventList = document.getElementById 'event-list'

searchEvents = (event) ->
  event.preventDefault()
  keyword = searchInput.value

  if !keyword
    return

  # 空白をカンマに変換して複数キーワードに対応
  keyword = keyword.replace /[ \s]/g, ','

  eventList.innerHTML = '<li>Searching...</li>'

  script = document.createElement 'script'
  script.src = 'http://api.atnd.org/events/?format=jsonp&keyword=' + keyword
  document.body.appendChild script
  document.body.removeChild script

showEvents = (data) ->
  eventList.innerHTML = ''

  if data && data.events instanceof Array
    data.events.forEach (eventData) ->
      eventInfo = eventData.event

      li = document.createElement 'li'
      time = document.createElement 'time'
      time.textContent = formatDate eventInfo.started_at
      a = document.createElement 'a'
      a.href = encodeURI eventInfo.event_url
      a.target = '_blank'
      a.textContent = eventInfo.title
      li.appendChild time
      li.appendChild a
      eventList.appendChild li

formatDate = (dateString) ->
  date = new Date dateString
  (date.getMonth() + 1) + '/' + date.getDate()

searchForm.addEventListener 'submit', searchEvents
window.callback = showEvents
