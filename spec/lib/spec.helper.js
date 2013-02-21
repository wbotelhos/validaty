function validate(that) {
  var helper     = that.form.validaty('helper'),
      validation = helper.getValidations(that.input[0])[0],
      validator  = that.form.validaty('validator', validation.validation),
      params     = [helper, that.form[0]].concat(validation.args);

  return validator.validate.apply(that.input, params);
};
