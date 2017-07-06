describe('helpers#getParams', function() {
  'use strict';

  afterEach(function() { Helper.clear(); });

  context('without space character at all', function() {
    beforeEach(function() {
      Helper.append(Helper.form({ html: Helper.text({ 'data-validaty': 'validation:1:string:3 on:focus:blur on:keyup' }) }));
    });

    it ('returns the validations with args', function() {
      // given
      var
        self     = $('form').validaty(),
        input    = self.children('input'),
        helper   = self.validaty('helper'),
        expected = {
          validations: [{ name: 'validation', args: [1, 'string', 3] }],
          actions:     [{ name: 'on', args: ['focus', 'blur'] }, { name: 'on', args: ['keyup'] }]
        };

      // when
      var validations = helper.getParams(input);

      // then
      expect(validations).toEqual(expected);
    });
  });

  context('with space character on validation', function() {
    beforeEach(function() {
      Helper.append(Helper.form({ html: Helper.text({ 'data-validaty': 'my%20validation:1:string:3' }) }));
    });

    it ('returns the validations with character', function() {
      // given
      var
        self     = $('form').validaty(),
        input    = self.children('input'),
        helper   = self.validaty('helper'),
        expected = {
          validations: [{ name: 'my%20validation', args: [1, 'string', 3] }],
          actions:     []
        };

      // when
      var validations = helper.getParams(input);

      // then
      expect(validations).toEqual(expected);
    });
  });

  context('with space character on args', function() {
    beforeEach(function() {
      Helper.append(Helper.form({ html: Helper.text({ 'data-validaty': 'validation:1:My%20String:3' }) }));
    });

    it ('returns the validations with args', function() {
      // given
      var
        self     = $('form').validaty(),
        input    = self.children('input'),
        helper   = self.validaty('helper'),
        expected = {
          validations: [{ name: 'validation', args: [1, 'My String', 3] }],
          actions:     []
        };

      // when
      var validations = helper.getParams(input);

      // then
      expect(validations).toEqual(expected);
    });
  });

  context('without the data-validaty attribute', function() {
    beforeEach(function() {
      Helper.append(Helper.form({ html: Helper.text() }));
    });

    it ('returns undefined', function() {
      // given
      var
        self     = $('form').validaty(),
        input    = self.children('input'),
        helper   = self.validaty('helper');

      // when
      var params = helper.getParams(input);

      // then
      expect(params).toBeUndefined();
    });
  });
});
