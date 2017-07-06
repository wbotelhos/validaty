describe('validations#username', function() {
  'use strict';

  afterEach(function() { Helper.clear(); });

  context('for text field', function() {
    beforeEach(function() {
      Helper.append(Helper.form({ html: Helper.radio({ name: 'name', 'data-validaty': 'username' }) }));

      this.form  = $('form').validaty(),
      this.input = this.form.children('input');
    });

    it ('pass', function() {
      this.input.val('');
      expect(validate(this)).toBeTruthy();

      this.input.val('a');
      expect(validate(this)).toBeTruthy();

      this.input.val('a_b');
      expect(validate(this)).toBeTruthy();

      this.input.val('a_bc_d');
      expect(validate(this)).toBeTruthy();

      this.input.val('1');
      expect(validate(this)).toBeTruthy();

      this.input.val('1_2');
      expect(validate(this)).toBeTruthy();

      this.input.val('1_23_45');
      expect(validate(this)).toBeTruthy();
    });

    it ('fails', function() {
      this.input.val(' ');
      expect(validate(this)).toBeFalsy();

      this.input.val('_');
      expect(validate(this)).toBeFalsy();

      this.input.val('o_');
      expect(validate(this)).toBeFalsy();

      this.input.val('1_');
      expect(validate(this)).toBeFalsy();

      this.input.val('1_2_');
      expect(validate(this)).toBeFalsy();

      this.input.val('a_b_');
      expect(validate(this)).toBeFalsy();

      this.input.val('_o');
      expect(validate(this)).toBeFalsy();

      this.input.val('o__');
      expect(validate(this)).toBeFalsy();

      this.input.val('o__o');
      expect(validate(this)).toBeFalsy();

      this.input.val('_1');
      expect(validate(this)).toBeFalsy();

      this.input.val('the@user');
      expect(validate(this)).toBeFalsy();

      this.input.val('the-user');
      expect(validate(this)).toBeFalsy();

      this.input.val('(theuser)');
      expect(validate(this)).toBeFalsy();
    });
  });
});
