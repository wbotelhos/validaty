$.validaty

.register('email', 'Must be a valid e-mail!', function(helper, el) {
  return helper.isEmail(this.val());
})

.register('maxlength', 'Too long (maximum is {max} characters)', function(helper, el, max) {
  return $.trim(this.val()).length <= max;
})

.register('minlength', 'Too short (minimum is {min} characters)', function(helper, el, min) {
  var value = $.trim(this.val());

  return value === '' || value.length >= min;
})

.register('number', 'Must be a number!', function(helper, el) {
  return helper.isNumber(this.val());
})

.register('range', 'Must be a number between {min} and {max}', function(helper, el, min, max) {
  var value = $.trim(this.val());

  return value === '' || !helper.isNumber(value) || (value >= min && value <= max);
})

.register('rangelength', 'Wrong length (minimum is {min} and maximum is {max} characters)', function(helper, el, min, max) {
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

;
