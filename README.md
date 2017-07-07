# jQuery Validaty - A Validation Plugin - [wbotelhos.com/validaty](http://wbotelhos.com/validaty)

jQuery Validaty is a form validation plugin.

## Version

```
@version        0.5.0
@since          2013-02-10
@author         Washington Botelho
@documentation  wbotelhos.com/validaty
@twitter        twitter.com/wbotelhos
```

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
  <input type="text" data-validaty="required" />
</form>
```

```js
$('form').validaty();
```

### Actions

Add the key `on:` with the action you want to trigger the validation.

```html
<form>
  <input type="text" data-validaty="required on:blur" />
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

## Licence

[The MIT License](http://opensource.org/licenses/MIT)

## Donate

You can do it via [PayPal](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=X8HEP2878NDEG&item_name=jQuery%20Validaty). Thanks! (:
