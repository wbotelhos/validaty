fixture.setBase('spec/fixtures');

function context(description, spec) {
  'use strict';

  describe(description, spec);
}

function validate(that) {
  'use strict';

  var helper     = that.form.validaty('helper');
  var validation = helper.getParams(that.input[0]).validations[0];
  var validator  = that.form.validaty('validator', validation.name);
  var params     = [helper, that.form[0]].concat(validation.args);

  return validator.validate.apply(that.input, params);
};
