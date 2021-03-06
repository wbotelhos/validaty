describe('onInvalid', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  context('when valid', function() {
    it('is executed', function(done) {
      var form = $('form');

      form.validaty({
        onInvalid: function(inputs, event) {
          expect(inputs.length).toEqual(1);
          expect(inputs[0]).toEqual(document.querySelector('input'));
          expect(event.type).toEqual('submit');
          expect(this).toEqual(form[0]);

          done();
        }
      });

      $('[data-validaty]').val(false);

      form.submit();
    });
  });

  context('when fail', function() {
    it('not executed', function() {
      var form = $('form');

      form.validaty({
        onInvalid: function() {
          fail('onInvalid must not be called');
        }
      });

      $('[data-validaty]').val(true);

      form.submit();
    });
  });
});
