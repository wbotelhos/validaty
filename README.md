# Validaty - A Validation Plugin

[![Build Status](https://travis-ci.org/wbotelhos/validaty.svg)](https://travis-ci.org/wbotelhos/validaty)
[![NPM Version](https://badge.fury.io/js/validaty-js.svg)](https://badge.fury.io/js/validaty-js)
[![Dependency](https://david-dm.org/wbotelhos/validaty.svg)](https://david-dm.org/wbotelhos/validaty)
[![Dev Dependency](https://david-dm.org/wbotelhos/validaty/dev-status.svg)](https://david-dm.org/wbotelhos/validaty#info=devDependencies)
[![Code Climate](https://codeclimate.com/github/wbotelhos/validaty.png)](https://codeclimate.com/github/wbotelhos/validaty)
[![Patreon](https://img.shields.io/badge/donate-%3C3-brightgreen.svg)](https://www.patreon.com/wbotelhos)

## Required Files

+ jquery.validaty.css
+ jquery.validaty.js
+ jquery.validaty.validators.js

## Options

|Property   |value    |Description                                      |
|-----------|---------|-------------------------------------------------|
|balloon    |true     |Enables the balloon message or list message style|
|errorTarget|undefined|Callback to intercept the errors                 |
|fade       |true     |Enables the fade on balloons message             |
|fadeSpeed  |200      |The speed of the fade option                     |
|focus      |'first'  |Field to be focused when validation fails        |
|ignore     |':submit'|Fields to be ignored                             |
|onFail     |undefined|Callback run on faile                            |
|onValid    |undefined|Callback run on valid                            |
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

### Actions

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

This file contains all validators and you can include your own.
It was separated from `jquery.validaty.js` to be more flexible and easy to edit and add more.
By default it comes with the following validators:

+ Contain
+ Date ISO
+ Digits
+ E-mail
+ Equal
+ Max Check
+ Max Length
+ Max Select
+ Min Check
+ Min Length
+ Min Select
+ Number
+ Range Length
+ Range Number
+ Required
+ URL
+ Username
