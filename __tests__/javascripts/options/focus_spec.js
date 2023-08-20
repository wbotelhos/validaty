describe('focus', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('focus.html');
  });

  it('is focus the first invalid field', function() {
    var form   = $('form');
    var fields = $('[data-validaty]');

    form.validaty({ focus: 'first' });

    fields.val(false);

    form.submit();

    expect(fields[0] === document.activeElement).toEqual(true);
    expect(fields[1] === document.activeElement).toEqual(false);
  });

  it('is focus the last invalid field', function() {
    var form   = $('form');
    var fields = $('[data-validaty]');

    form.validaty({ focus: 'last' });

    fields.val(false);

    form.submit();

    expect(fields[0] === document.activeElement).toEqual(false);
    expect(fields[1] === document.activeElement).toEqual(true);
  });
});
