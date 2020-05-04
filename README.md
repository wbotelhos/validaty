# jQuery Validaty - A Validation Plugin

[![Build Status](https://img.shields.io/travis/wbotelhos/validaty/master.svg)](https://travis-ci.org/wbotelhos/validaty)
[![NPM Version](https://badge.fury.io/js/validaty.svg)](https://badge.fury.io/js/validaty)
[![Dependency](https://david-dm.org/wbotelhos/validaty.svg)](https://david-dm.org/wbotelhos/validaty)
[![Dev Dependency](https://david-dm.org/wbotelhos/validaty/dev-status.svg)](https://david-dm.org/wbotelhos/validaty#info=devDependencies)
[![Code Climate](https://codeclimate.com/github/wbotelhos/validaty.png)](https://codeclimate.com/github/wbotelhos/validaty)
[![Support](http://img.shields.io/gittip/wbotelhos.svg)](https://gratipay.com/~wbotelhos)

jQuery Validaty is a form validation plugin.

## Required Files

+ jquery.validaty.css
+ jquery.validaty.js
+ jquery.validaty.validators.js

## Options

```js
balloon:    true       // Enables the balloon message or list message style.
fade:       true       // Enables the fade on balloons message.
focus:      'first'    // Field to be focused when validation fails.
errorTarget: undefined // Callback to intercept the errors.
ignore:     ':submit'  // Fields to be ignored.
speed:      200        // The speed of the fade option.
validators: {}         // Object to hold the validators functions.
```

## Usage

Use the attribute `data-validaty` to declare the validation you want.

```html
<form>
  <input type="text" data-validaty="required">
</form>
```

```js
$('form').validaty();
```

### Actions

Add the key `on:` with the action you want to trigger the validation.

```html
<form>
  <input type="text" data-validaty="required on:blur">
</form>
```

Uses `data-validaty-ignore` to ignored some validation included on `data-validaty`.

```html
<form>
  <input type="text" data-validaty="required" data-validaty-ignore="required">
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

## Contributors

[Check it out](http://github.com/wbotelhos/validaty/graphs/contributors)

## Love it!

Via [PayPal](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=X8HEP2878NDEG&item_name=validaty) or [Gratipay](https://gratipay.com/validaty). Thanks! (:
