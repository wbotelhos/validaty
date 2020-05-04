/*!
 * jQuery Validaty - A Validation Plugin
 *
 * The MIT License
 *
 * @author  Washington Botelho
 * @doc     wbotelhos.com/validaty
 * @version 0.6.0
 */

;(function($) {
  'use strict';

  var helper  = {};
  var methods = {};

  methods.init = function(settings) {
    return this.each(function() {
      methods.destroy.call(this);

      this.opt = $.extend({}, $.fn.validaty.defaults, settings);

      var self = $(this).addClass('validaty');

      methods._bind.call(this);

      self.data({ settings: this.opt, validaty: true });
    });
  };

  methods.destroy = function() {
    return $(this).each(function() {
      $(this).off('.validaty').removeClass('validaty');
    });
  };

  methods.helper = function(name) {
    return helper;
  };

  methods.valid = function() {
    return $(this).data('valid');
  };

  methods.validate = function(fields) {
    return this.each(function() {
      methods._process.call(this, [].concat.apply([], fields));
    });
  };

  methods.validator = function(name) {
    return $.fn.validaty.defaults.validators[name] || $.error('Validator "' + name + '" not registered!');
  };

  methods._bind = function() {
    this.inputs = methods._fields.call(this);

    $(this).on('submit.validaty', function(evt) {
      methods._process.call(this, this.inputs, evt);
    }.bind(this));

    var that = this;

    for (var i = 0; i < this.inputs.length; i++) {
      var field   = this.inputs[i];
      var actions = helper.getParams(field).actions;

      field.hash = 'validaty-' + this.opt.hash();

      field = $(field);

      for (var index in actions) {
        var binds = actions[index].args.join('.validaty ') + '.validaty';

        field.on(binds, function(evt, forced) {
          if (!forced) {
            methods._process.call(that, [this], evt);
          }
        });
      }
    }
  };

  methods._clear = function(field) {
    $('#' + field.hash).remove();

    $(field).removeClass('invalid valid');
  };

  methods._display = function(result) {
    var message = methods._message.call(this, result);
    var wrapper = message.children('ul');

    for (var i = 0; i < result.fail.length; i++) {
      $('<li />', { text: result.fail[i].message }).appendTo(wrapper);
    }

    message.animate({ opacity: 1 }, function() {
      if (this.opt.onMessage) {
        this.opt.onMessage();
      }
    }.bind(this));
  };

  methods._distinct = function(fields) {
    var names    = [];
    var distinct = [];
    var inputs   = $($(fields).get().reverse());

    for (var i = 0; i < inputs.length; i++) {
      if (methods._isCheckable(inputs[i])) {
        if ($.inArray(inputs[i].name, names) === -1) {
          names.push(inputs[i].name);
          distinct.push(inputs[i]);
        }
      } else {
        distinct.push(inputs[i]);
      }
    }

    return distinct;
  };

  methods._error = function(field, validator, args) {
    var message = validator.message;

    if (typeof validator.message === 'object') {
      if (field.is('input')) {
        message = validator.message[field.attr('type')];
      } else if (field.is('select')) {
        message = validator.message.select;
      } else if (field.is('textarea')) {
        message = validator.message.textarea;
      }
    }

    return methods._format.call(this, message, args);
  };

  methods._fields = function() {
    var self   = $(this);
    var fields = self.is('form') ? $(this).find(':input') : self;

    return fields.not(this.opt.ignore);
  }

  methods._format = function(message, args) {
    message = message || 'Message type missing!';

    var holders = message.match(/{[^}]*}/g);

    if (holders) {
      for (var i = 0; i < holders.length; i++) {
        if (i == args.length) {
          break;
        }

        message = message.replace(holders[i], args[i]);
      }
    }

    return message;
  };

  methods._highlight = function(result) {
    var inputs = result.el;

    if (methods._isCheckable(result.el[0])) {
      inputs = $(this).find('[name="' + result.el.attr('name') + '"]');
    }

    inputs.addClass(result.fail.length ? 'invalid' : 'valid')
  };

  methods._isCheckable = function(input) {
    /checkbox|radio/i.test(input.type)
  };

  methods._message = function(result) {
    var message = $('<div />', { id: result.el[0].hash, html: '<ul></ul>', 'class': 'validaty-message' });

    if (this.opt.errorTarget) {
      this.opt.errorTarget.call(this, result.el, message);
    } else {
      message.insertAfter(result.el[0]);
    }

    return message;
  };

  methods._process = function(fields, evt) {
    fields = (fields && fields.length && fields) || this.inputs;

    var distinct = methods._distinct.call(this, fields);
    var submit   = evt && evt.type === 'submit';

    for (var i = 0; i < fields.length; i++) {
      methods._clear.call(this, fields[i]);
    }

    for (var i = 0; i < distinct.length; i++) {
      var result = methods._validate.call(this, distinct[i]);

      if (result.fail.length > 0) {
        if (submit) {
          evt.preventDefault();
        }

        methods._display.call(this, result);
      }

      methods._highlight.call(this, result);
    }

    if (this.opt.focus && submit) {
      var forced = true;

      $(this).find('.invalid:visible:' + this.opt.focus).trigger('focus', forced);
    }

    var valid = !$(fields).filter('.invalid').length;

    $(this).data('valid', valid);

    if (valid) {
      this.opt.onValid && this.opt.onValid.call(this, fields, evt);
    } else {
      this.opt.onInvalid && this.opt.onInvalid.call(this, fields, evt);
    }
  };

  methods._validate = function(input) {
    var that        = this;
    var validations = helper.getParams(input).validations;

    input = $(input);

    var ignoreItems = [];
    var ignores     = input.attr('data-validaty-ignore');
    var result      = { el: input, pass: [], fail: [] };

    if (typeof ignores === 'string') {
      ignoreItems = ignores.split(' ');
    }

    for (var i = 0; i < validations.length; i++) {
      var name      = validations[i].name;
      var validator = that.opt.validators[name];

      if (!validator) {
        $.error('Validator "' + name + '" not registered!');
      }

      var args  = validations[i].args;
      var error = methods._error.call(that, input, validator, args);
      var valid = ignoreItems.includes(name) ? true : validator.validate.apply(input, [helper, that].concat(args));

      result[valid ? 'pass' : 'fail'].push({ type: name, message: error });
    }

    return result;
  };

  helper.getParams = function(input) {
    var data   = $(input).attr('data-validaty');
    var params = { validations: [], actions: [] };

    if (data) {
      var items = data.split(/\s+/);

      for (var i = 0; i < items.length; i++) {
        var args     = $(items[i].split(':')).get().reverse();
        var name     = args.pop();
        var isAction = /^on/.test(name);

        args = $(args).get().reverse();

        if (!isAction) {
          for (var j = 0; j < args.length; j++) {
            if (isNaN(args[j])) {
              args[j] = args[j].replace('%20', ' ');
            } else if (name !== 'equal') {
              args[j] = parseInt(args[j]);
            }
          }
        }

        params[isAction ? 'actions' : 'validations'].push({ name: name, args: args });
      }
    }

    return params;
  };

  $.fn.validaty = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist!');
    }
  };

  $.fn.validaty.defaults = {
    errorTarget: undefined,
    focus:       'first',
    hash:        function() { return Math.random().toString().substring(2); },
    ignore:      ':submit, :reset, :image, :disabled',
    onInvalid:   undefined,
    onValid:     undefined,
    validators:  {},
  };

  $.validaty = {
    register: function() {
      $.fn.validaty.defaults.validators[arguments[0]] = { message: arguments[1], validate: arguments[2] };

      return this;
    }
  };
})(jQuery);
