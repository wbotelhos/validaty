# Validaty - A Validation Plugin

[![Build Status](https://travis-ci.org/wbotelhos/validaty.svg)](https://travis-ci.org/wbotelhos/validaty)
[![NPM Version](https://badge.fury.io/js/validaty.svg)](https://badge.fury.io/js/validaty)
[![Dependency](https://david-dm.org/wbotelhos/validaty.svg)](https://david-dm.org/wbotelhos/validaty)
[![Dev Dependency](https://david-dm.org/wbotelhos/validaty/dev-status.svg)](https://david-dm.org/wbotelhos/validaty#info=devDependencies)
[![Maintainability](https://api.codeclimate.com/v1/badges/2df5d0746211fc302b92/maintainability)](https://codeclimate.com/github/wbotelhos/validaty/maintainability)
[![Patreon](https://img.shields.io/badge/donate-%3C3-brightgreen.svg)](https://www.patreon.com/wbotelhos)

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
