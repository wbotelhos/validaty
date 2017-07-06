describe('validations#maxlength', function() {
  'use strict';

  afterEach(function() { Helper.clear(); });

  context('for text field', function() {
    beforeEach(function() {
      Helper.append(Helper.form({ html: Helper.text({ 'data-validaty': 'maxlength:2' }) }));

      this.form  = $('form').validaty(),
      this.input = this.form.children('input');
    });

    it ('pass', function() {
      this.input.val('');
      expect(validate(this)).toBeTruthy();

      this.input.val('   ');
      expect(validate(this)).toBeTruthy();

      this.input.val('1');
      expect(validate(this)).toBeTruthy();

      this.input.val('12');
      expect(validate(this)).toBeTruthy();
    });

    it ('fails', function() {
      this.input.val('123');
      expect(validate(this)).toBeFalsy();

      this.input.val('1234');
      expect(validate(this)).toBeFalsy();
    });
  });
});
