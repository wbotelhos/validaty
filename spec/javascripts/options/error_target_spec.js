describe('errorTarget', function() {
  'use strict';

  beforeEach(function() {
    this.field = Helper.text({ 'class': 'original', 'data-validaty': 'required' });

    Helper.append(Helper.form({ html: this.field }));
  });

  it ('intercepts the error message creation', function() {
    // given
    var self = $('form').validaty({
      errorTarget: function(field, message) {
        $(this).data({ field: field, message: message });
      }
    });

    // when
    self.trigger('submit');

    // then
    expect(self.children('input').next()).not.toHaveClass('validaty-balloon');
    expect(self.data('field')).toHaveClass('original');
    expect(self.data('message')).toHaveClass('validaty-balloon');
  });
});
