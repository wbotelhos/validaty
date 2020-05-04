it('sets class on wrapper', function() {
  fixture.load('default.html');

  // given
  var form = $('form');

  // when
  form.validaty();

  // then
  expect(form[0].classList[0]).toEqual('validaty');
});
