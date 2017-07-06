describe('validations#url', function() {
  'use strict';

  afterEach(function() { Helper.clear(); });

  context('for text field', function() {
    beforeEach(function() {
      Helper.append(Helper.form({ html: Helper.text({ 'data-validaty': 'url' }) }));

      this.form  = $('form').validaty(),
      this.input = this.form.children('input');
    });

    it ('pass', function() {
      this.input.val('');
      expect(validate(this)).toBeTruthy();

      this.input.val('http://wbotelhos.com');
      expect(validate(this)).toBeTruthy();

      this.input.val('https://wbotelhos.com.br');
      expect(validate(this)).toBeTruthy();

      this.input.val('ftp://wbotelhos.com');
      expect(validate(this)).toBeTruthy();

      this.input.val('sftp://wbotelhos.com');
      expect(validate(this)).toBeTruthy();

      this.input.val('git://wbotelhos.com');
      expect(validate(this)).toBeTruthy();
    });

    it ('fails', function() {
      this.input.val('    ');
      expect(validate(this)).toBeFalsy();

      this.input.val('wbotelhos');
      expect(validate(this)).toBeFalsy();

      this.input.val('wbotelhos.com');
      expect(validate(this)).toBeFalsy();

      this.input.val('http://wbotelhos');
      expect(validate(this)).toBeFalsy();
    });
  });
});
