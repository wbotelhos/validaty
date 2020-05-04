function contains(value, word) {
  'use strict';

  return value.indexOf(word) !== -1;
};

function isCheckable(input) {
  'use strict';

  return /checkbox|radio/i.test(input.type);
};

function isDateISO(value) {
  'use strict';

  return /^(\d{4})\-(0[1-9]|1[0-2])\-([12]\d|0[1-9]|3[01])$/.test(value);
};

function isDigits(value) {
  'use strict';

  return /^\d+$/.test(value);
};

function isEmail(value) {
  'use strict';

  return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
};

function isNumber(value) {
  'use strict';

  return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
};

function isUrl(value) {
  'use strict';

  return /^(https?|s?ftp|git):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
};

function isUsername(value) {
  return /^[a-zA-Z0-9]+(_?[a-zA-Z0-9]+)*$/i.test(value);
};

$.validaty

.register('validation-name', 'validation-message', function(helper, form, word) {
  'use strict';

  return this.val() === 'true';
})

.register('contain', 'Must contain "{word}"!', function(helper, el, word) {
  'use strict';

  return this.val() === '' || contains(this.val(), word);
})

.register('dateiso', 'Must be a valid date ISO (yyyy-MM-dd)!', function(helper, el) {
  'use strict';

  var value = $.trim(this.val());

  return value === '' || isDateISO(value);
})

.register('digits', 'Must be digits!', function(helper, el) {
  'use strict';

  return this.val() === '' || isDigits(this.val());
})

.register('email', 'Must be a valid e-mail!', function(helper, el) {
  'use strict';

  var value = $.trim(this.val());

  return value === '' || isEmail(value);
})

.register('equal', 'Must be equals to "{value}"!', function(helper, el, value) {
  'use strict';

  return this.val() == value;
})

.register('maxcheck', 'Check at most {max} checkboxes!', function(helper, el, max) {
  'use strict';

  return $(el).find('[name="' + this.attr('name') + '"]:checked:enabled').length <= max;
})

.register('maxlength', 'Too long (max is {max} characters)!', function(helper, el, max) {
  'use strict';

  return $.trim(this.val()).length <= max;
})

.register('maxselect', 'Select at most {max} options!', function(helper, el, max) {
  'use strict';

  return $(this).children(':enabled').filter(':selected').length <= max;
})

.register('mincheck', 'Check at least {min} checkboxes!', function(helper, el, min) {
  'use strict';

  return $(el).find('[name="' + this.attr('name') + '"]:checked:enabled').length >= min;
})

.register('minlength', 'Too short (min is {min} characters)!', function(helper, el, min) {
  'use strict';

  return $.trim(this.val()).length >= min;
})

.register('minselect', 'Select at least {min} options!', function(helper, el, min) {
  'use strict';

  return $(this).children(':enabled').filter(':selected').length >= min;
})

.register('number', 'Must be a number!', function(helper, el) {
  'use strict';

  return this.val() === '' || isNumber(this.val());
})

.register('range', 'Must be a number between {min} and {max}!', function(helper, el, min, max) {
  'use strict';

  return this.val() === '' || isNumber(this.val()) && (this.val() >= min && this.val() <= max);
})

.register('rangecheck', 'Check between {min} and {max} checkboxes!', function(helper, el, min, max) {
  'use strict';

  var count = $(el).find('[name="' + this.attr('name') + '"]:checked:enabled').length;

  return count >= min && count <= max;
})

.register('rangelength', 'Wrong length (min is {min} and max is {max} characters)!', function(helper, el, min, max) {
  'use strict';

  var value = $.trim(this.val());

  return value === '' || (value.length >= min && value.length <= max);
})

.register('rangeselect', 'Select between {min} and {max} options!', function(helper, el, min, max) {
  'use strict';

  var count = $(this).children(':enabled').filter(':selected').length;

  return count >= min && count <= max;
})

.register('required', {
  text:     'Can\'t be blank or empty!',
  textarea: 'Can\'t be blank or empty!',
  checkbox: 'Should be checked!',
  radio:    'Should be chosen!',
  select:   'Should be selected!'
}, function(helper, el) {
  'use strict';

  if (isCheckable(this[0])) {
    var attributes = '[name="' + this.attr('name') + '"]:checked';

    return $(el).find(':radio' + attributes + ', :checkbox' + attributes).length > 0;
  } else {
    return $.trim(this.val()) !== '';
  }
})

.register('url', 'Must be a valid URL!', function(helper, el) {
  'use strict';

  return this.val() === '' || isUrl(this.val());
})

.register('username', 'Must be a valid username (a-z, A-Z and _) only!', function(helper, el) {
  'use strict';

  return this.val() === '' || isUsername(this.val());
})

;
