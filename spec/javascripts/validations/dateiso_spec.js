describe('validations#dateiso', function() {
  'use strict';

  afterEach(function() { Helper.clear(); });

  context('for text field', function() {
    beforeEach(function() {
      Helper.append(Helper.form({ html: Helper.radio({ name: 'name', 'data-validaty': 'dateiso' }) }));

      this.form  = $('form').validaty(),
      this.input = this.form.children('input');
    });

    it ('pass', function() {
      this.input.val('');
      expect(validate(this)).toBeTruthy();

      this.input.val('    ');
      expect(validate(this)).toBeTruthy();

      this.input.val('1984-10-23');
      expect(validate(this)).toBeTruthy();
    });

    it ('fails', function() {
      this.input.val('1984/10/23');
      expect(validate(this)).toBeFalsy();

      this.input.val('23/10/1984');
      expect(validate(this)).toBeFalsy();

      this.input.val('23-10-1984');
      expect(validate(this)).toBeFalsy();

      this.input.val('1984_10_23');
      expect(validate(this)).toBeFalsy();
    });
  });
});
