$.validaty

.register('contain', 'Must contain "{word}"!', function(helper, el, word) {
  return this.val() === '' || helper.contains(this.val(), word);
})

.register('dateiso', 'Must be a valid date ISO (yyyy-MM-dd)!', function(helper, el) {
  var value = $.trim(this.val());

  return value === '' || helper.isDateISO(value);
})

.register('digits', 'Must be digits!', function(helper, el) {
  return this.val() === '' || helper.isDigits(this.val());
})

.register('email', 'Must be a valid e-mail!', function(helper, el) {
  var value = $.trim(this.val());

  return value === '' || helper.isEmail(value);
})

.register('equal', 'Must be equals to "{value}"!', function(helper, el, value) {
  return this.val() === '' || this.val() == value;
})

.register('maxlength', 'Too long (maximum is {max} characters)!', function(helper, el, max) {
  return $.trim(this.val()).length <= max;
})

.register('minlength', 'Too short (minimum is {min} characters)!', function(helper, el, min) {
  var value = $.trim(this.val());

  return value === '' || value.length >= min;
})

.register('number', 'Must be a number!', function(helper, el) {
  return this.val() === '' || helper.isNumber(this.val());
})

.register('range', 'Must be a number between {min} and {max}!', function(helper, el, min, max) {
  return this.val() === '' || !helper.isNumber(this.val()) || (this.val() >= min && this.val() <= max);
})

.register('rangelength', 'Wrong length (minimum is {min} and maximum is {max} characters)!', function(helper, el, min, max) {
  var value = $.trim(this.val());

  return value === '' || (value.length >= min && value.length <= max);
})

.register('required', { text: "Can't be blank or empty!", checkbox: 'Should be checked!', radio: 'Should be chosen!', select: 'Should be selected!' }, function(helper, el) {
  if (helper.isCheckable(this[0])) {
    var attributes = '[name="' + this.attr('name') + '"]:checked';

    return $(el).find(':radio' + attributes + ', :checkbox' + attributes).length > 0;
  } else {
    return $.trim(this.val()) !== '';
  }
})

.register('url', 'Must be a valid URL!', function(helper, el) {
  return this.val() === '' || helper.isUrl(this.val());
})

.register('username', 'Must be a valid username (a-z, A-Z and _) only!', function(helper, el) {
  return this.val() === '' || helper.isUsername(this.val());
})

;
