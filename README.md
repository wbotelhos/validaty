# jQuery Validaty - A Validation Plugin - [wbotelhos.com/validaty](http://wbotelhos.com/validaty)

jQuery Validaty is a form validation plugin based on jQuery Validation and jQuery Ketchup.

## Version

```
@version        0.1.0
@since          2012-02-10
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
fade       : true       // Enables the fade on balloons message.
focus      : 'first'    // Field to be focused when validation fails.
ignore     : ':submit'  // Fields to be ignored.
speed      : 200        // The speed of the fade option.
validators : {}         // Object to hold the validators functions.
```

## Usage

```html
<form>
  <input type="text" data-validaty="required" />
</form>
```

```js
$('form').validaty();
```

## Functions

```js
$('form').validaty('helper');    // Gives you the internal helpers.

$('form').validaty('validator'); // Gives you a validator.

$('form').validaty('destroy');   // Destroy the Validaty's bind.

$('form').validaty('validate');  // Execute the validation over the form.
```

## Validators.js

This file contains all validators and you can include your own.
It was separated from `jquery.validaty.js` to be more flexible and easy to edit and add more.
By default it comes with the following validators:

+ E-mail
+ Maximum Length
+ Minimum Length
+ Number
+ Range Length
+ Required

## Licence

The MIT License

Copyright (c) 2012 Washington Botelho

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Donate

You can do it via [PayPal](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=X8HEP2878NDEG&item_name=jQuery%20Validaty). Thanks! (:
