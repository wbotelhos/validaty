# Validaty - A Validation Plugin

[![Tests](https://github.com/wbotelhos/validaty/workflows/Tests/badge.svg)](https://github.com/wbotelhos/validaty/actions/workflows/tests.yml)
[![NPM Version](https://badge.fury.io/js/validaty.svg)](https://badge.fury.io/js/validaty)
[![Maintainability](https://api.codeclimate.com/v1/badges/e152fa0075358ae855f1/maintainability)](https://codeclimate.com/github/wbotelhos/validaty/maintainability)
[![Sponsor](https://img.shields.io/badge/sponsor-%3C3-green)](https://github.com/sponsors/wbotelhos)

## Required Files

+ jquery.validaty.css
+ jquery.validaty.js
+ jquery.validaty.validators.js

## Options

|Property   |value    |Description                                      |
|-----------|---------|-------------------------------------------------|
|errorTarget|undefined|Callback to intercept the errors                 |
|focus      |'first'  |Field to be focused when validation fails        |
|ignore     |':submit'|Fields to be ignored                             |
|onInvalid  |undefined|Callback called when some field is invalid       |
|onMessage  |undefined|Callback called when validation message is shown |
|onValid    |undefined|Callback called when all fields is valid         |
|validators |{}       |Object to hold the validators functions          |

## Usage

### data-validaty

The attribute `data-validaty` receives the validation name.

```html
<form>
  <input type="text" data-validaty="required">
</form>
```

```js
$('form').validaty();
```

### data-validaty-ignore

Used to ignore some validation included on `data-validaty`.

```html
<form>
  <input type="text" data-validaty="required" data-validaty-ignore="required">
</form>
```

### on

Add the key `on:` with the action you want to trigger the validation.

```html
<form>
  <input type="text" data-validaty="required on:blur">
</form>
```

## Functions

```js
$('form').validaty('helper');              // Gives you the internal helpers.
$('form').validaty('validator');           // Gives you a validator.
$('form').validaty('destroy');             // Destroy the Validaty's bind.
$('form').validaty('validate', selectors); // Execute the validation over the form or the given selectors.
```

## Validators.js

This file should contain all validators, just includes your validations calling `register`.

|Property          |Description                                                      |
|------------------|-----------------------------------------------------------------|
|validation-name   |The name of your validation                                      |
|validation-message|The message shown when you validation fails `return false`       |
|form              |The validated form                                               |
|word              |???                                                              |
