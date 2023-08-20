describe('errorTarget', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('error_target.html');
  });

  it('receives message element to be manipulated', function(done) {
    var form   = $('form');
    var target = $('[data-error-target]');

    form.validaty({
      errorTarget: function(el, message) {
        expect(el[0]).toEqual(document.querySelector('input'));

        target.html(message);
      },

      onMessage: function() {
        var element = document.querySelector('[data-error-target] .validaty-message');

        expect(document.body.contains(element)).toEqual(true);

        done();
      }
    });

    $('[data-validaty]').val(false);

    form.submit();
  });
});
