describe('functions#destroy', function() {
  beforeEach(function() {
    Helper.append(Helper.form());
  });

  afterEach(function() { Helper.clear(); });

  it ('is chainable', function() {
    // given
    var self = $('form').validaty();

    // when
    var ref = self.validaty('destroy');

    // then
    expect(ref).toEqual(self);
  });

  it ('removes the main class', function() {
    // given
    var self = $('form').validaty();

    // when
    self.validaty('destroy');

    // then
    expect(self).not.toHaveClass('validaty');
  });

  it ('removes prevent submit', function() {
    // given
    var self = $('form').validaty();

    // when
    self.validaty('destroy');

    // then
    //expect(self.data('mouseleave')).toBeFalsy();
  });
});
