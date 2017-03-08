function validate(that) {
  'use strict';

  var
    helper     = that.form.validaty('helper'),
    validation = helper.getParams(that.input[0]).validations[0],
    validator  = that.form.validaty('validator', validation.name),
    params     = [helper, that.form[0]].concat(validation.args);

  return validator.validate.apply(that.input, params);
};
