describe('functions#validator', function() {
  beforeEach(function() {
    Helper.append(Helper.form());
  });

  afterEach(function() { Helper.clear(); });

  it ('returns the right validator', function() {
    // given
    var self = $('form').validaty();

    // when
    var validator = self.validaty('validator', 'required');

    // then
    expect(validator).toBe($.fn.validaty.defaults.validators.required);
  });

  context('not registered', function() {
    it ('returns the right validator', function() {
      // given
      var self = $('form').validaty();

      // when
      var lambda = function() { self.validaty('validator', 'notfound') };

      // then
      expect(lambda).toThrow(new Error('Validator "notfound" not registered!'));
    });
  });
});
