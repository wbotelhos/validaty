## 0.6.0

- Adds `onFail` option callback;
- In some point option `speed` was renamed to `fadeSpeed`;
- Adds `data-validaty-ignore` to ignore `data-validaty` validations.

## 0.5.2

### Fixes

+ Removes class `valid` and `invalid` before each validation to avoid `invalid valid` class.

## 0.5.1

### Changes

+ fields with no `data-validaty` will return empty `validators` and `actions` instead of `undefined`;
+ fields with no `data-validaty` will be processed too.

## 0.5.0

### News

+ Added callback options `errorTarget` where you receive the field and message and decide what to do with that;
+ Now the public `validate` method can receive the fields you want to validate.

## 0.4.1

### Fixes

+ Replace `startsWith` with Regex, since IE does not support it.

## 0.4.0

## News

+ Added callback option `onValid` that runs when all fields are valid.
+ Added function `valid` to check if all fields is valid.

## 0.3.0

### Fixes

+ The fade effect was being applied even when not enabled;
+ The fade was not binding to the list style message.

## 0.2.0

### News

+ Added option `balloon` to choose between balloon or list style message.

### Fixes

+ The `equal` validator was accepting blank value.

## 0.1.0

### News

+ Balloon message to show the erros;
+ Bind via form.
+ Helper methods inside the plugin;
+ Highlight for valid and invalid fields;
+ Method to call the validation on form;
+ Method to destroy the Validaty's bind;
+ Method to get the validators;
+ Option to choose which field will be focused when validation fails;
+ Separated file to create the validators;
+ Support to declare the trigger of the validation inline with `on:` key;
+ Validation for:
  - contain;
  - digits;
  - e-mail;
  - equal;
  - isodate;
  - maxcheck;
  - maxlength;
  - maxselect;
  - mincheck;
  - minlength;
  - minselect;
  - number;
  - range;
  - rangelength;
  - required;
  - url;
  - username.
