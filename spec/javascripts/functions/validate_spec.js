describe('functions#validate', function() {
  'use strict';

  beforeEach(function() {
    Helper.append(Helper.form({
      html: Helper.text({ 'data-validaty': 'required' }) + Helper.text({ 'data-validaty': 'required' })
    }));
  });

  afterEach(function() { Helper.clear(); });

  context ('with no given field', function() {
    xit ('validates all fields', function() {
      // given
      var
        self  = $('form').validaty(),
        input = self.children('input');

      // when
      self.validaty('validate');

      // then
      expect(input.length).toEqual(2);
      expect(input).toHaveClass('invalid');
    });
  });

  context ('with one field given', function() {
    xit ('validates only the given field', function() {
      // given
      var
        self   = $('form').validaty(),
        inputs = self.children('input');

      // when
      self.validaty('validate', inputs.first());

      // then
      expect(inputs.length).toEqual(2);
      expect(inputs.first()).toHaveClass('invalid');
      expect(inputs.last()).not.toHaveClass('invalid');
    });
  });

  context ('with more than one field given', function() {
    xit ('validates all given fields', function() {
      // given
      var
        self   = $('form').validaty(),
        inputs = self.children('input');

      // when
      self.validaty('validate', inputs);

      // then
      expect(inputs.length).toEqual(2);
      expect(inputs.first()).toHaveClass('invalid');
      expect(inputs.last()).toHaveClass('invalid');
    });
  });

  context ('with more than one radio field with the same name given', function() {
    beforeEach(function() {
      Helper.append(Helper.form({
        html: Helper.radio({ name: 'name', 'data-validaty': 'required', times: 2 })
      }));
    });

    it ('show only one invalid message', function() {
      // given
      var self = $('form').validaty();

      self.children(':text').val('valid');

      // when
      self.validaty('validate', self.children(':radio'));

      // then
      expect(self.find('.validaty-balloon').length).toEqual(1);
    });
  });
});
