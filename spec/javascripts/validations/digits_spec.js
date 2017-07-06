describe('validations#digits', function() {
  'use strict';

  afterEach(function() { Helper.clear(); });

  context('for text field', function() {
    beforeEach(function() {
      Helper.append(Helper.form({ html: Helper.radio({ name: 'name', 'data-validaty': 'digits' }) }));

      this.form  = $('form').validaty(),
      this.input = this.form.children('input');
    });

    it ('pass', function() {
      this.input.val('');
      expect(validate(this)).toBeTruthy();

      this.input.val('1');
      expect(validate(this)).toBeTruthy();

      this.input.val(2);
      expect(validate(this)).toBeTruthy();
    });

    it ('fails', function() {
      this.input.val(' ');
      expect(validate(this)).toBeFalsy();

      this.input.val('a');
      expect(validate(this)).toBeFalsy();

      this.input.val('-1');
      expect(validate(this)).toBeFalsy();

      this.input.val(-1);
      expect(validate(this)).toBeFalsy();

      this.input.val(1.2);
      expect(validate(this)).toBeFalsy();
    });
  });
});
