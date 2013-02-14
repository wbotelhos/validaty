isClear = true;

function context(description, spec) {
  describe(description, spec);
};

function form(fields, id) {
  var id      = id     || 'element' ,
      content = fields || '';

  $('body').append('<form id="' + id + '" onsubmit="return false;">' + fields + '</form>');
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
    $('.validaty-balloon').remove();
  }
};

function validate(el) {
  return el.validator.validate.call(el.input, el.helper, el.form[0]);
};

describe('Validaty', function() {
  afterEach(function() { clear(); });

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

  describe('balloon', function() {
    describe('generic situation', function() {
      beforeEach(function() { form(input('text', 'required') + input('text', 'number', 'letter')); });

      it ('is created', function() {
        // given
        var self = $('form').validaty();

        // when
        self.submit();

        // then
        expect($('.validaty-balloon')).toExist();
      });

      it ('receives two items', function() {
        // given
        var self = $('form').validaty();

        // when
        self.submit();

        // then
        expect($('.validaty-balloon').length).toEqual(2);
      });

      it ('write two messages', function() {
        // given
        var self = $('form').validaty();

        // when
        self.submit();

        // then
        var messages = $('.validaty-balloon').find('li'),
            opt      = $.fn.validaty.defaults;

        expect(messages.eq(0)).toHaveHtml(opt.validators.required.message.text);
        expect(messages.eq(1)).toHaveHtml(opt.validators.number.message);
      });

      it ('removes the last one', function() {
        // given
        var self = $('form').validaty();

        // when
        self.submit().submit();

        // then
        expect($('.validaty-balloon').length).toEqual(2);
      });

      context('on mouseover', function() {
        xit ('faded out the others', function() {
          // given
          var self     = $('form').validaty().submit(),
              balloons = $('.validaty-balloon');

          // when
          balloons.eq(0).mouseenter();

          // then
          expect(balloons.eq(0)).toHaveCss({ opacity: 1 });
          expect(balloons.eq(1)).toHaveClass({ opacity: .3 });
        });
      });
    });

    context('for radio field with same name', function() {
      beforeEach(function() { form(radio('required', 2)); });

      it ('created just one balloon', function() {
        // given
        var self = $('form').validaty();

        // when
        self.submit();

        // then
        expect($('.validaty-balloon').length).toEqual(1);
      });
    });

    context('for checkbox field with same name', function() {
      beforeEach(function() { form(checkbox('required', 2)); });

      it ('created just one balloon', function() {
        // given
        var self = $('form').validaty();

        // when
        self.submit();

        // then
        expect($('.validaty-balloon').length).toEqual(1);
      });
    });
  });

  describe('form', function() {
    describe('configurations', function() {
      beforeEach(function() { form(); });

      it ('receives the main class', function() {
        // given
        var self = $('form');

        // when
        self.validaty();

        // then
        expect(self).toHaveClass('validaty');
      });
    });

    describe('chainnig', function() {
      beforeEach(function() { form(); });

      it ('is chainable', function() {
        // given
        var self = $('form');

        // when
        var ref = self.validaty();

        // then
        expect(ref).toBe(self);
      });
    });

    describe('fields', function() {
      context('insided elements', function() {
        beforeEach(function() { form('<p>' + input('text', 'required') + '</p>'); });

        it ('is finded', function() {
          // given
          var self = $('form').validaty();

          // when
          self.submit();

          // then
          expect(self[0].inputs).toBe(self.find('input'));
        });
      });

      context('created dynamically', function() {
        beforeEach(function() { form('<p>' + input('text', 'required') + '</p>'); });

        it ('is included on validation', function() {
          // given
          var self = $('form').validaty();

          // when
          self.append(input('text', 'required')).submit();

          // then
          expect($('.validaty-balloon').length).toEqual(2);
        });
      });

      context('with more than one invalid field', function() {
        beforeEach(function() { form(input('text', 'required') + input('text', 'required')); });

        it ('focus the first one', function() {
          // given
          var self = $('form').validaty();

          // when
          self.submit();

          // then
          expect(self.children(':input:first')).toBeFocused();
        });

        context('when invalid', function() {
          it ('receives the invalid class', function() {
            // given
            var self   = $('form').validaty(),
                inputs = self.children('input');

            // when
            self.submit()

            // then
            expect(inputs.eq(0)).toHaveClass('invalid');
          });
        });

        context('when becomes valid', function() {
          it ('lost the invalid class', function() {
            // given
            var self   = $('form').validaty(),
                inputs = self.children('input');

            self.submit()

            // when
            inputs.eq(0).val('valid');

            self.submit();

            // then
            expect(inputs.eq(0)).not.toHaveClass('invalid');
            expect(inputs.eq(1)).toHaveClass('invalid');
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
              var message = $('.validaty-balloon').find('li');

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
              var message = $('.validaty-balloon').find('li');

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
            var message = $('.validaty-balloon').find('li');

            expect(message).toHaveHtml('Message type missing!');
          });
        });
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

        context('with the last (last to be validated) checked', function() {
          it ('pass', function() {
            this.input.last().click();
            expect(validate(this)).toBeTruthy();
          });
        });
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
  });
});
