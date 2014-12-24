buildWufooPostObject = (formFields) ->
  postObject = {
    Field1   : formFields.first_name
    Field2   : formFields.last_name
    Field9   : formFields.email
    Field212 : formFields.questions
  }

  postObject.Field12 = formFields.speaker if formFields.speaker
  postObject.Field13 = formFields.mentor if formFields.mentor
  postObject.Field14 = formFields.volunteer if formFields.volunteer
  postObject.Field15 = formFields.internship if formFields.internship
  postObject.Field16 = formFields.site_tour if formFields.site_tour

  postObject

module.exports = buildWufooPostObject
