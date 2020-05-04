it('is chainable', function() {
  // given
  var self = $('form');

  // when
  var ref = self.validaty();

  // then
  expect(ref).toBe(self);
});
