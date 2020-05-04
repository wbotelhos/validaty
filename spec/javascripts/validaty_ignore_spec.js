describe('data-validaty', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('ignore.html');
  });

  it('ignores the validation the given validations', function() {
    var form  = $('form').validaty();
    var field = $('[data-validaty]');

    field.val(false);

    form.submit();

    expect(field[0].classList[0]).toEqual('valid');
  });
});
