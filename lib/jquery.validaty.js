/*!
 * jQuery Validaty - A Validation Plugin
 * ----------------------------------------------------------------------
 *
 * jQuery Validaty is a form validation plugin based on jQuery Validation and jQuery Ketchup.
 *
 * Licensed under The MIT License
 *
 * @version        0.1.0
 * @since          2012-02-10
 * @author         Washington Botelho
 * @documentation  wbotelhos.com/validaty
 *
 * ----------------------------------------------------------------------
 *
 *  <form>
 *    <input type="text" data-validy="required" />
 *  </form>
 *
 *  $('form').validaty();
 *
 */

;(function($) {

  var methods = {
    init: function(settings) {
      return this.each(function() {
        methods.destroy.call(this);

        this.opt = $.extend({}, $.fn.validaty.defaults, settings);

        var that = $(this).addClass('validaty');

        methods._bind.call(this);

        that.data({ 'settings': this.opt, 'validaty': true });
      });
    }, _bind: function() {
      var self = this,
          form = $(this);

      form.on('submit.validaty', function(evt) {
        self.inputs = methods._fields.call(self);

        methods._clear.call(self);

        var radios = [];

        $.each(self.inputs.get().reverse(), function() {
          if (this.type === 'radio') {
             if ($.inArray(this.name, radios) === -1) {
                radios.push(this.name)
                methods._process.call(self, this, evt);
             }
          } else {
            methods._process.call(self, this, evt);
          }
        });

        methods._fade.call(self);
      });
    }, _balloon: function(input) {
      input = $(input);

      var offset = input.offset(),
          html   = '<ul></ul><div></div>',
          css    = { top: offset.top, left: offset.left + input.outerWidth() - 15 };

      return $('<div />', { html: html, 'class': 'validaty-balloon', css: css }).appendTo('body');
    }, _clear: function() {
      this.inputs.removeClass('invalid');

      $('.validaty-balloon').remove();
    }, _display: function(input, errors) {
      var balloon = methods._balloon.call(this, input);

      methods._writeBalloon.call(this, balloon, errors);
      methods._showBalloon.call(this, balloon);
    }, _fade: function() {
      var self     = this,
          balloons = $('.validaty-balloon');

      balloons.on('mouseenter.validaty', function() {
        var overed = this;
            other  = $('.validaty-balloon').filter(function() {
              return this !== overed;
            });

        other.animate({ opacity: .2 }, { duration: self.opt.speed, queue: false });
      }).on('mouseleave.validaty', function() {
        balloons.animate({ opacity: 1 }, { duration: self.opt.speed, queue: false });
      });
    }, _fields: function() {
      return $(this).find(':input').not(this.opt.ignore);
    }, _highlight: function(errors) {
      $.each(errors, function() {
        $(this.el).addClass('invalid');
      });

      if (this.opt.focus) {
        $(this).find('.invalid').filter(':' + (this.opt.focus ? 'first' : 'last')).focus();
      }
    }, _message: function(field, validation) {
      var validator = this.opt.validators[validation],
          message   = undefined;

      if (typeof validator.message === 'object') {
        if (field.is('input')) {
          message = validator.message[field.attr('type')];
        } else if (field.is('select')) {
          message = validator.message.select;
        }

        if (!message) {
          message = 'Message type missing!';
        }
      } else {
        message = validator.message
      }

      return message || validator.message;
    }, _process: function(input, evt) {
      var errors = methods._validate.call(this, input);

      if (errors.length > 0) {
        evt.preventDefault();

        methods._highlight.call(this, errors);
        methods._display.call(this, input, errors);
      }
    }, _showBalloon: function(balloon) {
      var position = balloon.offset().top - balloon.height();

      balloon.css({ top: position }).animate({ opacity: 1 });
    }, _writeBalloon: function(balloon, errors) {
      var ul = balloon.children('ul');

      for (var i = 0; i < errors.length; i++) {
        $('<li />', { text: errors[i].message }).appendTo(ul);
      }
    }, _validate: function(input) {
      input = $(input);

      var errors      = [],
          validations = input.attr('data-validaty');

      if (validations) {
        validations = validations.split(/\s/);

        for (var i = 0; i < validations.length; i++) {
          var validation = validations[i],
              validator  = this.opt.validators[validation],
              valid      = validator.validate.call(input, helper, this),
              message    = methods._message.call(this, input, validation)

          if (!valid) {
           errors.push({ el: input, type: validation, message: message });
          }
        }
      }

      return errors;
    }, destroy: function() {
      return $(this).each(function() {
        $(this).off('.validaty').removeClass('validaty');
      });
    }, helper: function(name) {
      return helper;
    }, validator: function(name) {
      return $.fn.validaty.defaults.validators[name];
    }
  }, helper = {
    isCheckable: function(input) {
      return /checkbox|radio/i.test(input.type);
    }, isEmail : function(value) {
      return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test($.trim(value));
    }, isNumber: function(value) {
      return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test($.trim(value));
    }
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
    fade       : true,
    focus      : 'first',
    ignore     : ':submit, :reset, :image, :disabled',
    speed      : 200,
    validators : {}
  };

  $.validaty = {
    register: function() {
      $.fn.validaty.defaults.validators[arguments[0]] = { message: arguments[1], validate: arguments[2] };
      return this;
    }
  };

})(jQuery);
