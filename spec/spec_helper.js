isClear = true;

function clear() {
  if (isClear) {
    $('form').remove();
  }
};

function context(description, spec) {
  describe(description, spec);
};

function checkbox(validations, number, toSelect) {
  var content = '',
      html    = '';

  for (var i = 1; i <= number; i++) {
    content = (i === toSelect) ? 'checked="checked"' : '';

    html += '<input type="checkbox" name="checkbox" data-validaty="' + validations + '" ' + content + ' />';
  }

  return html;
};

function form(fields, id) {
  var content = fields || '';

  $('body').append('<form onsubmit="return false;">' + fields + '</form>');
};

function input(type, validations, value) {
  value = value ? 'value="' + value + '"' : '';

  return '<input type="' + type + '" data-validaty="' + validations + '" ' + value + ' />';
};

function radio(validations, number, toSelect) {
  var content = '',
      html    = '';

  for (var i = 1; i <= number; i++) {
    content = (i === toSelect) ? 'selected="selected"' : '';

    html += '<input type="radio" name="radio" data-validaty="' + validations + '" ' + content + ' />';
  }

  return html;
};

function select(validations, number, toSelect) {
  var content = '',
      html    = '<select data-validaty="' + validations + '"><option value=""></option>';

  for (var i = 1; i <= number; i++) {
    content = (i === toSelect) ? ' selected="selected"' : '';

    html += '<option value="' + i + '"' + content + '>' + i + '</option>';
  }

  html += '</select>';

  return html;
};

function validate(that) {
  var helper     = that.form.validaty('helper'),
      validation = helper.getValidations(that.input[0])[0],
      validator  = that.form.validaty('validator', validation.validation),
      params     = [helper, that.form[0]].concat(validation.args);

  return validator.validate.apply(that.input, params);
};
