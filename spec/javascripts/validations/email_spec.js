describe('validations#email', function() {
  'use strict';

  beforeEach(function() {
    Helper.append(Helper.form({ html: Helper.text({ 'data-validaty': 'email' }) }));

    this.form  = $('form').validaty(),
    this.input = this.form.children('input');
  });

  afterEach(function() { Helper.clear(); });

  it ('pass', function() {
    this.input.val('');
    expect(validate(this)).toBeTruthy();

    this.input.val(' ');
    expect(validate(this)).toBeTruthy();

    this.input.val('wbotelhos@gmail.com');
    expect(validate(this)).toBeTruthy();
  });

  it ('fails', function() {
    this.input.val('wbotelho');
    expect(validate(this)).toBeFalsy();

    this.input.val('wbotelho@');
    expect(validate(this)).toBeFalsy();

    this.input.val('wbotelho@g');
    expect(validate(this)).toBeFalsy();

    this.input.val('wbotelho@gmail');
    expect(validate(this)).toBeFalsy();

    this.input.val('wbotelho@gmail.');
    expect(validate(this)).toBeFalsy();
  });
});
