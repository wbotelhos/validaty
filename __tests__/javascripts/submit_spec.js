describe('submit', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  it('triggers on submit', function() {
    var form = $('form').validaty();
    var field = $('[data-validaty]').val(true);

    form.submit();

    expect(field[0].classList[0]).toEqual('valid');
  });
});
