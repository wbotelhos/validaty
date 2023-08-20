describe('data-validaty', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  context('when validator returns true', function() {
    it('adds valid class to the field', function() {
      var form  = $('form').validaty();
      var field = $('[data-validaty]');

      field.val(true);

      form.submit();

      expect(field[0].classList[0]).toEqual('valid');
    });

    it('marks form as valid', function() {
      var form  = $('form').validaty();
      var field = $('[data-validaty]');

      field.val(true);

      form.submit();

      expect(form.data('valid')).toEqual(true);
    });
  });

  context('when validator returns false', function() {
    it('adds invalid class to the field', function() {
      var form  = $('form').validaty();
      var field = $('[data-validaty]');

      field.val(false);

      form.submit();

      expect(field[0].classList[0]).toEqual('invalid');
    });

    it('marks form as valid', function() {
      var form  = $('form').validaty();
      var field = $('[data-validaty]');

      field.val(false);

      form.submit();

      expect(form.data('valid')).toEqual(false);
    });

    context('when becomes valid again', function() {
      it('removes the invalid class', function() {
        var form  = $('form').validaty();
        var field = $('[data-validaty]');

        field.val(false);

        form.submit();

        field.val(true);

        form.submit();

        expect(field[0].classList.contains('invalid')).toEqual(false);
      });

      it('removes the message', function() {
        var form  = $('form').validaty();
        var field = $('[data-validaty]');

        field.val(false);

        form.submit();

        field.val(true);

        form.submit();

        var message = document.querySelector('.validaty-message');

        expect(document.body.contains(message)).toEqual(false);
      });
    });
  });
});
