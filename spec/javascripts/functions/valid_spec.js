describe('functions#valid', function() {
  afterEach(function() { Helper.clear(); });

  context('when all field is valid', function() {
    beforeEach(function() {
      Helper.append(
        Helper.form({
          html: Helper.input({ type: 'type', 'data-validaty': 'number' })
        })
      );
    });

    it ('is returns true', function() {
      // given
      var self = $('form').validaty();

      // when
      self.validaty('validate');

      // then
      expect(self.validaty('valid')).toBeTruthy();
    });
  });

  context('when some field is not valid', function() {
    beforeEach(function() {
      Helper.append(
        Helper.form({
          html: [
            Helper.input({ type: 'type', 'data-validaty': 'number', value: 1 }),
            Helper.input({ type: 'type', 'data-validaty': 'number', value: 'text' })
          ]
        })
      );
    });

    it ('is returns false', function() {
      // given
      var self = $('form').validaty();

      // when
      self.validaty('validate');

      // then
      expect(self.validaty('valid')).toBeFalsy();
    });
  });
});
