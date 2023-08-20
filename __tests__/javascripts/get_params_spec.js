describe('onInvalid', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  context('when valid', function() {
    it('is executed', function() {
      var form   = $('form').attr('data-validaty', 'validation:1:string:3 on:focus:blur on:keyup').validaty();
      var input  = $('[data-validaty]');
      var helper = form.validaty('helper');

      $('[data-validaty]').val(false);

      var validations = helper.getParams(input);

      expect(validations).toEqual({
        validations: [{ name: 'validation', args: [1, 'string', 3] }],
        actions:     [{ name: 'on', args: ['focus', 'blur'] }, { name: 'on', args: ['keyup'] }]
      });
    });
  });
});
