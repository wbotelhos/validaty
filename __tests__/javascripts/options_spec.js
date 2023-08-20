describe('options', function() {
  'use strict';

  it('has the right value options', function() {
    // given
    var validaty = $.fn.validaty

    // when
    var options = validaty.defaults

    // then
    expect(options.errorTarget).toEqual(undefined)
    expect(options.focus).toEqual('first')
    expect(options.ignore).toEqual(':submit, :reset, :image, :disabled')
    expect(options.onFail).toEqual(undefined)
    expect(options.onInvalid).toEqual(undefined)
    expect(options.onMessage).toEqual(undefined)
    expect(options.onValid).toEqual(undefined)
  });
});
