describe('validations#required', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  context ('when validator returns true', function() {
    it ('adds valid class to the field', function() {
      var form = $('form').validaty();
      var field = $('[data-validaty]');

      field.val(true);

      $('[data-button]').click();

      expect(field[0].classList[0]).toEqual('valid');
    });

    it ('marks form as valid', function() {
      var form = $('form').validaty();
      var field = $('[data-validaty]');

      field.val(true);

      $('[data-button]').click();

      expect(form.data('valid')).toEqual(true);
    });
  });

  context ('when validator returns false', function() {
    it ('adds invalid class to the field', function() {
      var form = $('form').validaty();
      var field = $('[data-validaty]');

      field.val(false);

      $('[data-button]').click();

      expect(field[0].classList[0]).toEqual('invalid');
    });

    it ('marks form as valid', function() {
      var form = $('form').validaty();
      var field = $('[data-validaty]');

      field.val(false);

      $('[data-button]').click();

      expect(form.data('valid')).toEqual(false);
    });
  });
});
