describe('onMessage', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('error_target.html');
  });

  it('is called when message is shown', function(done) {
    var form = $('form');

    form.validaty({
      onMessage: function() {
        var element = document.querySelector('.validaty-message');

        expect(document.body.contains(element)).toEqual(true);

        done();
      }
    });

    $('[data-validaty]').val(false);

    form.submit();
  });
});
