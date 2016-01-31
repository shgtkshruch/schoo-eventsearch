element = document.createElement 'script'
element.src = 'http://api.atnd.org/events/?format=jsonp'
document.body.appendChild element

window.callback = (data) ->
  console.log data
