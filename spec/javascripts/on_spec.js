describe('on', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('blur.html');
  });

  it('triggers on blur', function() {
    var form  = $('form').validaty();
    var field = $('[data-validaty]').attr('data-validaty', 'validation-name on:blur');

    field.val(true).blur();

    expect(field[0].classList[0]).toEqual('valid');
  });
});
