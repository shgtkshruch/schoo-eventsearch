eventList = document.getElementById 'event-list'

element = document.createElement 'script'
element.src = 'http://api.atnd.org/events/?format=jsonp'
document.body.appendChild element
document.body.removeChild element

showEvents = (data) ->
  if data && data.events instanceof Array
    data.events.forEach (eventData) ->
      eventInfo = eventData.event

      li = document.createElement 'li'
      time = document.createElement 'time'
      time.textContent = formatDate eventInfo.started_at
      a = document.createElement 'a'
      a.href = eventInfo.event_url
      a.target = '_blank'
      a.textContent = eventInfo.title
      li.appendChild time
      li.appendChild a
      eventList.appendChild li

formatDate = (dateString) ->
  date = new Date dateString
  (date.getMonth() + 1) + '/' + date.getDate()

window.callback = showEvents
