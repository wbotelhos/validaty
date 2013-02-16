isClear = true;

function context(description, spec) {
  describe(description, spec);
};

function form(fields, id) {
  var content = fields || '';

  $('body').append('<form onsubmit="return false;">' + fields + '</form>');
};

function input(type, validations, value) {
  value = value ? 'value="' + value + '"' : '';

  return '<input type="' + type + '" data-validaty="' + validations + '" ' + value + ' />';
};

function checkbox(validations, number, toSelect) {
  var content = '',
      html    = '';

  for (var i = 1; i <= number; i++) {
    content = (i === toSelect) ? 'checked="checked"' : '';

    html += '<input type="checkbox" name="checkbox" data-validaty="' + validations + '" ' + content + ' />';
  }

  return html;
};

function radio(validations, number, toSelect) {
  var content = '',
      html    = '';

  for (var i = 1; i <= number; i++) {
    content = (i === toSelect) ? 'selected="selected"' : '';

    html += '<input type="radio" name="radio" data-validaty="' + validations + '" ' + content + ' />';
  }

  return html;
};

function select(validations, number, toSelect) {
  var content = '',
      html    = '<select data-validaty="' + validations + '"><option value=""></option>';

  for (var i = 1; i <= number; i++) {
    content = (i === toSelect) ? ' selected="selected"' : '';

    html += '<option value="' + i + '"' + content + '>' + i + '</option>';
  }

  html += '</select>';

  return html;
};

function clear() {
  if (isClear) {
    $('form').remove();
  }
};

function validate(el) {
  return el.validator.validate.call(el.input, el.helper, el.form[0]);
};

describe('Validaty', function() {
  afterEach(function() { clear(); });

  describe('balloon', function() {
    describe('behavior', function() {
      beforeEach(function() { form(input('text', 'required') + input('text', 'number', 'letter')); });

      it ('is created inside the form', function() {
        // given
        var self = $('form').validaty();

        // when
        self.submit();

        // then
        expect($('.validaty-balloon')).toExist();
      });

      it ('is created two times', function() {
        // given
        var self = $('form').validaty();

        // when
        self.submit();

        // then
        expect(self.children('.validaty-balloon').length).toEqual(2);
      });

      it ('receives two messages', function() {
        // given
        var self = $('form').validaty();

        // when
        self.submit();

        // then
        var messages = self.children('.validaty-balloon').find('li'),
            opt      = $.fn.validaty.defaults;

        expect(messages.eq(0)).toHaveHtml(opt.validators.required.message.text);
        expect(messages.eq(1)).toHaveHtml(opt.validators.number.message);
      });

      it ('is destroy before the validation', function() {
        // given
        var self = $('form').validaty();

        // when
        self.submit().submit();

        // then
        expect(self.children('.validaty-balloon').length).toEqual(2);
      });

      context('mouseover', function() {
        it ('keeps visible and fades the others', function() {
          // given
          var self     = $('form').validaty({ speed: 0 }),
              balloons = undefined;

          runs(function() {
            self.submit();

            balloons = self.children('.validaty-balloon');
          });

          waits(400);

          // when
          runs(function() {
            balloons.first().mouseover();
          });

          waits(400);

          // then
          runs(function() {
            expect(balloons.first().css('opacity')).toEqual('1');
            expect(balloons.last().css('opacity')).toEqual('0.2');
          });
        });
      });
    });

    context('on another form', function() {
      beforeEach(function() {
        form(input('text', 'required') + input('text', 'required'));
        form(input('text', 'required'));
      });

      context('on validation', function() {
        it ('keeps alive', function() {
          // given
          var self = $('form').validaty();

          self.eq(0).submit();

          // when
          self.eq(1).submit();

          // then
          expect(self.eq(0).children('.validaty-balloon').length).toEqual(2);
        });
      });

      context('on mouseover', function() {
        it ('keeps visible', function() {
          // given
          var self      = $('form').validaty({ speed: 0 }),
              balloons1 = undefined,
              balloons2 = undefined;

          runs(function() {
            self.submit();

            balloons1 = self.first().children('.validaty-balloon');
            balloons2 = self.last().children('.validaty-balloon');
          });

          waits(400);

          // when
          runs(function() {
            balloons2.first().mouseover();
          });

          waits(400);

          // then
          runs(function() {
            expect(balloons1.css('opacity')).toEqual('1');
          });
        });
      });
    });
  });

  describe('fields', function() {
    context('insided elements', function() {
      beforeEach(function() { form('<p>' + input('text', 'required') + '</p>'); });

      it ('is finded to be binded', function() {
        // given
        var self = $('form').validaty();

        // when
        self.submit();

        // then
        expect(self.find('input')).toHaveClass('invalid');
      });
    });

    describe('text', function() {
      context('with more than one', function() {
        beforeEach(function() { form(input('text', 'required') + input('text', 'required')); });

        context('invalid', function() {
          it ('receives the same number of balloons', function() {
            // given
            var self = $('form').validaty();

            // when
            self.submit();

            // then
            expect(self.children('.validaty-balloon').length).toEqual(2);
          });

          it ('receives the invalid and the other too', function() {
            // given
            var self = $('form').validaty();

            // when
            self.submit();

            // then
            expect(self.children('input')).toHaveClass('invalid');
          });
        });
      });
    });

    describe('checkbox', function() {
      context('with more than one', function() {
        beforeEach(function() { form(checkbox('required', 2)); });

        context('invalid', function() {
          it ('created just one balloon', function() {
            // given
            var self = $('form').validaty();

            // when
            self.submit();

            // then
            expect(self.children('.validaty-balloon').length).toEqual(1);
          });

          it ('receives the invalid and the other too', function() {
            // given
            var self = $('form').validaty();

            // when
            self.submit();

            // then
            expect(self.children('input:first')).toHaveClass('invalid');
            expect(self.children('input:last')).toHaveClass('invalid');
          });
        });

        context('valid', function() {
          it ('receives the valid and the other too', function() {
            // given
            var self   = $('form').validaty(),
                inputs = self.children('input');

            inputs.first().click();

            // when
            self.submit();

            // then
            expect(inputs.first()).toHaveClass('valid');
            expect(inputs.last()).toHaveClass('valid');
          });
        });
      });
    });

    describe('radio', function() {
      context('with more than one', function() {
        beforeEach(function() { form(radio('required', 2)); });

        context('invalid', function() {
          it ('receives just one balloon', function() {
            // given
            var self = $('form').validaty();

            // when
            self.submit();

            // then
            expect(self.children('.validaty-balloon').length).toEqual(1);
          });

          it ('receives the invalid and the other too', function() {
            // given
            var self = $('form').validaty();

            // when
            self.submit();

            // then
            expect(self.children('input:first')).toHaveClass('invalid');
            expect(self.children('input:last')).toHaveClass('invalid');
          });
        });

        context('valid', function() {
          it ('receives the valid and the other too', function() {
            // given
            var self   = $('form').validaty(),
                inputs = self.children('input');

            inputs.first().click();

            // when
            self.submit();

            // then
            expect(inputs.first()).toHaveClass('valid');
            expect(inputs.last()).toHaveClass('valid');
          });
        });
      });
    });

    context('inserted after the bind', function() {
      beforeEach(function() { form(); });

      it ('is included on validation', function() {
        // given
        var self = $('form').validaty();

        // when
        self.append(input('text', 'required')).submit();

        // then
        expect(self.children('.validaty-balloon').length).toEqual(1);
      });
    });

    context('with validation not registered', function() {
      beforeEach(function() { form(input('text', 'notfound')); });

      it ('throws exception', function() {
        // given
        var self = $('form').validaty();

        // when
        var lambda = function() { self.submit(); };

        // then
        expect(lambda).toThrow(new Error('Validator "notfound" not registered!'));
      });
    });
  });

  describe('form', function() {
    describe('features', function() {
      beforeEach(function() { form(); });

      it ('receives the main class', function() {
        // given
        var self = $('form');

        // when
        self.validaty();

        // then
        expect(self).toHaveClass('validaty');
      });

      it ('is chainable', function() {
        // given
        var self = $('form');

        // when
        var ref = self.validaty();

        // then
        expect(ref).toBe(self);
      });
    });

    describe('options', function() {
      it ('has the right value options', function() {
        // given
        var validaty = $.fn.validaty

        // when
        var opt = validaty.defaults

        // then
        expect(opt.fade).toEqual(true);
        expect(opt.ignore).toEqual(':submit, :reset, :image, :disabled');
        expect(opt.speed).toEqual(200);
      });

      describe('focus', function() {
        beforeEach(function() { form(input('text', 'required') + input('text', 'required')); });

        context('as "first"', function() {
          it ('focus the first one', function() {
            // given
            var self = $('form').validaty({ focus: 'first' });

            // when
            self.submit();

            // then
            expect(self.children(':input:first')).toBeFocused();
          });
        });

        context('as "last"', function() {
          it ('focus the last one', function() {
            // given
            var self = $('form').validaty({ focus: 'last' });

            // when
            self.submit();

            // then
            expect(self.children(':input:last')).toBeFocused();
          });
        });

        context('as "null"', function() {
          it ('focus no one', function() {
            // given
            var self = $('form').validaty({ focus: null });

            // when
            self.submit();

            // then
            expect(self.children(':input:first')).not.toBeFocused();
            expect(self.children(':input:last')).not.toBeFocused();
          });
        });
      });
    });
  });

  describe('functions', function() {
    afterEach(function()  { clear(); });

    describe('#destroy', function() {
      beforeEach(function() { form(); });

      it ('is chainable', function() {
        // given
        var self = $('form').validaty();

        // when
        var ref = self.validaty('destroy');

        // then
        expect(ref).toBe(self);
      });

      it ('removes the main class', function() {
        // given
        var self = $('form').validaty();

        // when
        self.validaty('destroy');

        // then
        expect(self).not.toHaveClass('validaty');
      });

      it ('removes prevent submit', function() {
        // given
        var self = $('form').validaty();

        // when
        self.validaty('destroy');

        // then
        //expect(self.data('mouseleave')).toBeFalsy();
      });
    });

    describe('#validate', function() {
      beforeEach(function() { form(input('text', 'required')); });

      it ('validates the field', function() {
        // given
        var self  = $('form').validaty(),
            input = self.children('input');

        // when
        self.validaty('validate');

        // then
        expect(input).toHaveClass('invalid');
      });
    });

    describe('#validator', function() {
      beforeEach(function() { form(); });

      it ('returns the right validator', function() {
        // given
        var self = $('form').validaty();

        // when
        var validator = self.validaty('validator', 'required');

        // then
        expect(validator).toBe($.fn.validaty.defaults.validators.required);
      });

      context('not registered', function() {
        it ('returns the right validator', function() {
          // given
          var self = $('form').validaty();

          // when
          var lambda = function() { self.validaty('validator', 'notfound') };

          // then
          expect(lambda).toThrow(new Error('Validator "notfound" not registered!'));
        });
      });
    });
  });

  describe('validations', function() {
    describe('message', function() {
      it ('has the default right messages', function() {
        // given
        var self = $('form').validaty();

        // when
        var opt = $.fn.validaty.defaults

        // then
        expect(opt.validators.email.message).toEqual('Must be a valid e-mail!');
        expect(opt.validators.number.message).toEqual('Must be a number!');
        expect(opt.validators.required.message.checkbox).toEqual('Should be checked!');
        expect(opt.validators.required.message.radio).toEqual('Should be chosen!');
        expect(opt.validators.required.message.select).toEqual('Should be selected!');
        expect(opt.validators.required.message.text).toEqual("Can't be blank or empty!");
      });

      context('with details message', function() {
        beforeEach(function() {
          $.validaty.register('mock', {}, function() { return false; });
        });

        context('and match attribute', function() {
          context('for "input" type', function() {
            beforeEach(function() {
              $.fn.validaty.defaults.validators.mock.message['someType'] = 'someType'
              form(input('someType', 'mock'));
            });

            it ('receives the text message', function() {
              // given
              var self = $('form').validaty();

              // when
              self.submit();

              // then
              var message = self.children('.validaty-balloon').find('li');

              expect(message).toHaveHtml($.fn.validaty.defaults.validators.mock.message.someType);
            });
          });

          context('for "select" type', function() {
            beforeEach(function() {
              $.fn.validaty.defaults.validators.mock.message['select'] = 'select'
              form(select('mock', 2));
            });

            it ('receives the text message', function() {
              // given
              var self = $('form').validaty();

              // when
              self.submit();

              // then
              var message = self.children('.validaty-balloon').find('li');

              expect(message).toHaveHtml($.fn.validaty.defaults.validators.mock.message.select);
            });
          });
        });

        context('and no match attribute', function() {
          beforeEach(function() {
            form(input('type', 'mock'));
          });

          it ('receives the text message', function() {
            // given
            var self = $('form').validaty();

            // when
            self.submit();

            // then
            var message = self.children('.validaty-balloon').find('li');

            expect(message).toHaveHtml('Message type missing!');
          });
        });
      });
    });

    context('email', function() {
      beforeEach(function() {
        form(input('text', 'email'));

        this.form      = $('form').validaty(),
        this.validator = this.form.validaty('validator', 'email'),
        this.helper    = this.form.validaty('helper'),
        this.input     = this.form.children('input');
      });

      it ('pass', function() {
        this.input.val('wbotelhos@gmail.com');
        expect(validate(this)).toBeTruthy();
      });

      it ('fails', function() {
        this.input.val('wbotelho');
        expect(validate(this)).toBeFalsy();

        this.input.val('wbotelho@');
        expect(validate(this)).toBeFalsy();

        this.input.val('wbotelho@g');
        expect(validate(this)).toBeFalsy();

        this.input.val('wbotelho@gmail');
        expect(validate(this)).toBeFalsy();

        this.input.val('wbotelho@gmail.');
        expect(validate(this)).toBeFalsy();
      });
    });

    context('number', function() {
      beforeEach(function() {
        form(input('text', 'number'));

        this.form      = $('form').validaty(),
        this.validator = this.form.validaty('validator', 'number'),
        this.helper    = this.form.validaty('helper'),
        this.input     = this.form.children('input');
      });

      it ('pass', function() {
        this.input.val(1);
        expect(validate(this)).toBeTruthy();

        this.input.val('');
        expect(validate(this)).toBeTruthy();

        this.input.val(-1);
        expect(validate(this)).toBeTruthy();

        this.input.val(1.1);
        expect(validate(this)).toBeTruthy();

        this.input.val(-1.1);
        expect(validate(this)).toBeTruthy();

        this.input.val(1,1);
        expect(validate(this)).toBeTruthy();

        this.input.val(-1,1);
        expect(validate(this)).toBeTruthy();
      });

      it ('fails', function() {
        this.input.val('text');
        expect(validate(this)).toBeFalsy();
      });
    });

    context('required', function() {
      context('for text field', function() {
        beforeEach(function() {
          form(input('text', 'required'));

          this.form      = $('form').validaty(),
          this.validator = this.form.validaty('validator', 'required'),
          this.helper    = this.form.validaty('helper'),
          this.input     = this.form.children('input');
        });

        it ('pass', function() {
          this.input.val('text');
          expect(validate(this)).toBeTruthy();
        });

        it ('fails', function() {
          this.input.val('');
          expect(validate(this)).toBeFalsy();

          this.input.val(' ');
          expect(validate(this)).toBeFalsy();
        });
      });

      context('for radio field with same name', function() {
        beforeEach(function() {
          form(radio('required', 2, 1));

          this.form      = $('form').validaty(),
          this.validator = this.form.validaty('validator', 'required'),
          this.helper    = this.form.validaty('helper'),
          this.input     = this.form.children('input');
        });

        context('with the last (last to be validated) checked', function() {
          it ('pass', function() {
            this.input.last().click();
            expect(validate(this)).toBeTruthy();
          });
        });
      });

      context('for checkbox field with same name', function() {
        beforeEach(function() {
          form(checkbox('required', 2, 1));

          this.form      = $('form').validaty(),
          this.validator = this.form.validaty('validator', 'required'),
          this.helper    = this.form.validaty('helper'),
          this.input     = this.form.children('input');
        });

        context('when valid', function() {
          context('with the last (last to be validated) checked', function() {
            it ('pass', function() {
              this.input.last().click();
              expect(validate(this)).toBeTruthy();
            });
          });
        });

        context('when valid', function() {
          context('with the last (last to be validated) checked', function() {
            it ('pass', function() {
              this.input.last().click();
              expect(validate(this)).toBeTruthy();
            });
          });
        });
      });
    });
  });
});
