describe('validator', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  it('returns the right validator', function() {
    // given
    var form = $('form').validaty();

    // when
    var validator = form.validaty('validator', 'validation-name');

    // then
    expect(validator).toBe($.fn.validaty.defaults.validators['validation-name']);
  });

  context('when validator is not registered', function() {
    it('returns the right validator', function() {
      // given
      var form = $('form').validaty();

      // when
      var lambda = function() { form.validaty('validator', 'notfound') };

      // then
      expect(lambda).toThrow(new Error('Validator "notfound" not registered!'));
    });
  });
});
