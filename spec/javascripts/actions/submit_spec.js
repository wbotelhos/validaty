context('actions:submit', function() {
  'use strict';

  beforeEach(function() {
    Helper.append(Helper.form({
      html: Helper.text({ 'data-validaty': 'required' })
    }));
  });

  afterEach(function() { Helper.clear(); });

  it ('triggers the validation', function() {
    // given
    var self = $('form').validaty();

    // when
    self.submit();

    // then
    expect(self.children('.validaty-balloon')).toExist();
  });
});
