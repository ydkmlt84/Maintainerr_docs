/* Set up feedback, i.e. "Was this page helpful?" */
document$.subscribe(function __md_feedback() {
  var feedback = document.forms.feedback
  if (typeof feedback === 'undefined') return

  /* Send feedback to Analytics */
  for (var button of feedback.querySelectorAll('[type=submit]')) {
    button.addEventListener('click', function (ev) {
      ev.preventDefault()

      /* Retrieve and send data */
      var page = document.location.pathname
      var data = this.getAttribute('data-md-value')
      window._paq.push('event', 'feedback', { page, data })

      /* Disable form and show note, if given */
      feedback.firstElementChild.disabled = true
      var note = feedback.querySelector(
        ".md-feedback__note [data-md-value='" + data + "']"
      )
      if (note) note.hidden = false
    })

    /* Show feedback */
    feedback.hidden = false
  }
})
