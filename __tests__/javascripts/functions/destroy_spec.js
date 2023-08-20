describe('validator', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  it('removes the main class', function() {
    // given
    var form = $('form').validaty();

    // when
    form.validaty('destroy');

    // then
    expect(form[0].classList[0]).toEqual(undefined);
  });
});
