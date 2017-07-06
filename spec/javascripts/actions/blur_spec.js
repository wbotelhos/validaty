context('actions:blur', function() {
  beforeEach(function() {
    Helper.append(Helper.form({
      html: [
        Helper.text({ 'data-validaty': 'required on:blur' }),
        Helper.text()
      ]
    }));
  });

  afterEach(function() { Helper.clear(); });

  it ('triggers the validation', function() {
    // given
    var
      self  = $('form').validaty(),
      input = self.children('input:first').focus();

    // when
    input.blur();

    // then
    expect(self.children('.validaty-balloon')).toExist();
  });

  it ('does not focus back the blured field on error', function() {
    // given
    var
      self   = $('form').validaty(),
      inputs = self.children('input');

    inputs.first().focus();

    // when
    inputs.last().focus();

    // then
    expect(inputs.last()).toBeFocused();
  });
});
