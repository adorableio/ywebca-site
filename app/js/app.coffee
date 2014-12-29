$(document).ready ->
  $('form#help').submit (event) ->
    errorFound = false
    $('input[type=text]').each (index) ->
      el = $(this)

      el.removeClass 'error'
      el.parent().removeClass 'error'
      el.parent().siblings('small').remove()

      if el.val() == ""
        el.addClass 'error'
        el.parent().addClass 'error'
        el.parent().after("<small class='error'>Please enter a value.</small>")
        errorFound = true

    event.preventDefault() if errorFound

  console.log 'Form validation enabled'
