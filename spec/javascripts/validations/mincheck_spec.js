describe('validations#mincheck', function() {
  'use strict';

  afterEach(function() { Helper.clear(); });

  context('without disabled', function() {
    beforeEach(function() {
      Helper.append(
        Helper.form({
          html: Helper.checkbox({ name: 'name', 'data-validaty': 'mincheck:2', times: 3 })
        })
      );

      this.form  = $('form').validaty(),
      this.input = this.form.children('input');
    });

    it ('pass', function() {
      this.input.eq(0).attr('checked', 'checked');
      this.input.eq(1).attr('checked', 'checked');
      expect(validate(this)).toBeTruthy();

      this.input.eq(2).attr('checked', 'checked');
      expect(validate(this)).toBeTruthy();
    });

    it ('fails', function() {
      expect(validate(this)).toBeFalsy();
    });
  });

  context('with disabled', function() {
    beforeEach(function() {
      Helper.append(
        Helper.form({
          html: Helper.checkbox({ name: 'name', 'data-validaty': 'mincheck:2', times: 3, checked: true, disabled: true })
        })
      );

      this.form  = $('form').validaty(),
      this.input = this.form.children('input');
    });

    it ('pass ignoring the disabled inputs', function() {
      expect(validate(this)).toBeFalsy();
    });
  });
});
