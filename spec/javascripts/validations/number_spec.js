describe('validations#number', function() {
  'use strict';

  beforeEach(function() {
    Helper.append(Helper.form({ html: Helper.text({ 'data-validaty': 'number' }) }));

    this.form  = $('form').validaty(),
    this.input = this.form.children('input');
  });

  afterEach(function() { Helper.clear(); });

  it ('pass', function() {
    this.input.val(1);
    expect(validate(this)).toBeTruthy();

    this.input.val('');
    expect(validate(this)).toBeTruthy();

    this.input.val(-1);
    expect(validate(this)).toBeTruthy();

    this.input.val(1.1);
    expect(validate(this)).toBeTruthy();

    this.input.val(-1.1);
    expect(validate(this)).toBeTruthy();

    this.input.val(1, 1);
    expect(validate(this)).toBeTruthy();

    this.input.val(-1, 1);
    expect(validate(this)).toBeTruthy();
  });

  it ('fails', function() {
    this.input.val('text');
    expect(validate(this)).toBeFalsy();
  });
});
