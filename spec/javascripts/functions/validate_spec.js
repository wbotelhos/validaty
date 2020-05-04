describe('validate', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('focus.html');
  });

  it('is chainable', function() {
    // given
    var form = $('form').validaty();

    // when
    var ref = form.validaty('validate');

    // then
    expect(ref).toEqual(form);
  });

  context('when no field is given', function() {
    it('validates all fields', function() {
      // given
      var form   = $('form').validaty();
      var fields = $('[data-validaty]');

      // when
      form.validaty('validate');

      // then
      expect(fields[0].classList[0]).toEqual('invalid');
      expect(fields[1].classList[0]).toEqual('invalid');
    });
  });

  context('when some field is given', function() {
    it('validates only the given field', function() {
      // given
      var form   = $('form').validaty();
      var fields = $('[data-validaty]');

      // when
      form.validaty('validate', fields.first());

      // then
      expect(fields[0].classList[0]).toEqual('invalid');
      expect(fields[1].classList[0]).toEqual(undefined);
    });
  });

  context('when more than one field given', function() {
    it('validates all given fields', function() {
      // given
      var form   = $('form').validaty();
      var fields = $('[data-validaty]');

      // when
      form.validaty('validate', fields);

      // then
      expect(fields[0].classList[0]).toEqual('invalid');
      expect(fields[1].classList[0]).toEqual('invalid');
    });
  });
});
