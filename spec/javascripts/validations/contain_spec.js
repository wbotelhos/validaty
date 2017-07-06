describe('validations#contain', function() {
  'use strict';

  afterEach(function() { Helper.clear(); });

  context('for text field', function() {
    beforeEach(function() {
      Helper.append(Helper.form({ html: Helper.radio({ name: 'name', 'data-validaty': 'contain:word' }) }));

      this.form  = $('form').validaty(),
      this.input = this.form.children('input');
    });

    it ('pass', function() {
      this.input.val('');
      expect(validate(this)).toBeTruthy();

      this.input.val('word');
      expect(validate(this)).toBeTruthy();

      this.input.val('xword');
      expect(validate(this)).toBeTruthy();

      this.input.val('xwordx');
      expect(validate(this)).toBeTruthy();
    });

    it ('fails', function() {
      this.input.val(' ');
      expect(validate(this)).toBeFalsy();

      this.input.val('wor');
      expect(validate(this)).toBeFalsy();
    });
  });
});
