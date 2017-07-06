describe('functions#validate', function() {
  'use strict';

  beforeEach(function() {
    Helper.append(Helper.form({ html: Helper.text({ 'data-validaty': 'required' }) }));
  });

  afterEach(function() { Helper.clear(); });

  it ('validates the field', function() {
    // given
    var
      self  = $('form').validaty(),
      input = self.children('input');

    // when
    self.validaty('validate');

    // then
    expect(input).toHaveClass('invalid');
  });
});
