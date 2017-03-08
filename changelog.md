# jQuery Validaty - A Validation Plugin - http://wbotelhos.com/validaty

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
