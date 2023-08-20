$.validaty.register('validation-name', 'validation-message', function(helper, form, word) {
  'use strict';

  return this.val() === 'true';
});
