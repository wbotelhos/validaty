describe('validations#minselect', function() {
  'use strict';

  afterEach(function() { Helper.clear(); });

  context('without disabled', function() {
    beforeEach(function() {
      Helper.append(
        Helper.form({
          html: Helper.select({
            'data-validaty': 'minselect:1',
            html:            Helper.option({ html: '{index}', times: 2 }),
            multiple:        true
          })
        })
      );

      this.form    = $('form').validaty(),
      this.input   = this.form.children('select');
      this.options = this.input.children('option');
    });

    it ('pass', function() {
      this.options.eq(0).attr('selected', 'selected');
      expect(validate(this)).toBeTruthy();

      this.options.eq(1).attr('selected', 'selected');
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
          html: Helper.select({
            'data-validaty': 'minselect:1',
            html:            Helper.option({ html: '{index}', times: 2, selected: true, disabled: true }),
            multiple:        true
          })
        })
      );

      this.form    = $('form').validaty(),
      this.input   = this.form.children('select');
      this.options = this.input.children('option');
    });

    it ('pass ignoring the disabled inputs', function() {
      expect(validate(this)).toBeFalsy();
    });
  });
});
