$.validaty

.register('email', 'Must be a valid e-mail!', function(helper, el) {
  return helper.isEmail(this.val());
})

.register('minlength', 'Too short (minimum is {min} characters)', function(helper, el, min) {
  var value = $.trim(this.val());

  return value === '' || value.length >= min;
})

.register('number', 'Must be a number!', function(helper, el) {
  return helper.isNumber(this.val());
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
