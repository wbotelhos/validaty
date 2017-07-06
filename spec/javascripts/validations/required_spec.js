describe('validations#required', function() {
  'use strict';

  afterEach(function() { Helper.clear(); });

  context('for text field', function() {
    beforeEach(function() {
      Helper.append(Helper.form({ html: Helper.text({ 'data-validaty': 'required' }) }));

      this.form  = $('form').validaty(),
      this.input = this.form.children('input');
    });

    it ('pass', function() {
      this.input.val('text');
      expect(validate(this)).toBeTruthy();
    });

    it ('fails', function() {
      this.input.val('');
      expect(validate(this)).toBeFalsy();

      this.input.val(' ');
      expect(validate(this)).toBeFalsy();
    });
  });

  context('for radio field with same name', function() {
    beforeEach(function() {
      Helper.append(Helper.form({
        html: [
          Helper.radio({ name: 'name', 'data-validaty': 'required', selected: true }),
          Helper.radio({ name: 'name', 'data-validaty': 'required' })
        ]
      }));

      this.form  = $('form').validaty(),
      this.input = this.form.children('input');
    });

    context('with the last (last to be validated) checked', function() {
      it ('pass', function() {
        this.input.last().click();
        expect(validate(this)).toBeTruthy();
      });
    });
  });

  context('for checkbox field with same name', function() {
    beforeEach(function() {
      Helper.append(Helper.form({
        html: [
          Helper.radio({ name: 'name', 'data-validaty': 'required', selected: true }),
          Helper.radio({ name: 'name', 'data-validaty': 'required' })
        ]
      }));

      this.form  = $('form').validaty(),
      this.input = this.form.children('input');
    });

    context('when valid', function() {
      context('with the last (last to be validated) checked', function() {
        it ('pass', function() {
          this.input.last().click();
          expect(validate(this)).toBeTruthy();
        });
      });
    });

    context('when valid', function() {
      context('with the last (last to be validated) checked', function() {
        it ('pass', function() {
          this.input.last().click();
          expect(validate(this)).toBeTruthy();
        });
      });
    });
  });
});
