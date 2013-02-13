$.validaty

.register('email', 'Must be a valid e-mail!', function(helper, el) {
  return helper.isEmail(this.val());
})

.register('number', 'Must be a number!', function(helper, el) {
  return helper.isNumber(this.val());
})

.register('required',{ text: "Can't be blank or empty!", checkbox: 'Should be checked!', radio: 'Should be chosen!', select: 'Should be selected!' }, function(helper, el) {
  if (this.is(':checkbox')) {
    return this.is(':checked');
  } else if (this.is(':radio')) {
    return $(el).find(':radio[name="' + this.attr('name') + '"]:checked').length > 0;
  } else {
    return $.trim(this.val()) !== '';
  }
})

;
