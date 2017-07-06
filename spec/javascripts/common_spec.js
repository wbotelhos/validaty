context ('commons:options', function() {
  'use strict';

  it ('has the right value options', function() {
    // given
    var validaty = $.fn.validaty

    // when
    var opt = validaty.defaults

    // then
    expect(opt.balloon).toBeTruthy();
    expect(opt.fade).toEqual(true);
    expect(opt.fadeSpeed).toEqual(200);
    expect(opt.ignore).toEqual(':submit, :reset, :image, :disabled');
  });
});

describe('commons:features', function() {
  'use strict';

  beforeEach(function() {
    Helper.append(Helper.form());
  });

  afterEach(function() { Helper.clear(); });

  it ('receives the main class', function() {
    // given
    var self = $('form');

    // when
    self.validaty();

    // then
    expect(self).toHaveClass('validaty');
  });

  it ('is chainable', function() {
    // given
    var self = $('form');

    // when
    var ref = self.validaty();

    // then
    expect(ref).toBe(self);
  });
});
