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

      it ('is created the right number times', function() {
        // given
        var self = $('form').validaty();

        // when
        self.submit();

        // then
        expect(self.children('.validaty-balloon').length).toEqual(2);
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

          waits(450);

          // when
          runs(function() {
            balloons.first().mouseover();
          });

          waits(450);

          // then
          runs(function() {
            expect(balloons.first().css('opacity')).toEqual('1');
            expect(balloons.last().css('opacity').slice(0, 3)).toEqual('0.2');
          });
        });
      });
    });

    context('message', function() {
      describe('required', function() {
        context('text', function() {
          beforeEach(function() { form(input('text', 'required')); });

          it ('formats the right text', function() {
            // given
            var self = $('form').validaty();

            // when
            self.submit();

            // then
            var message = self.children('.validaty-balloon').find('li');

            expect(message).toHaveHtml("Can't be blank or empty!");
          });
        });

        context('radio', function() {
          beforeEach(function() { form(radio('required', 1)); });

          it ('formats the right text', function() {
            // given
            var self = $('form').validaty();

            // when
            self.submit();

            // then
            var message = self.children('.validaty-balloon').find('li');

            expect(message).toHaveHtml('Should be chosen!');
          });
        });

        context('checkbox', function() {
          beforeEach(function() { form(checkbox('required', 1)); });

          it ('formats the right text', function() {
            // given
            var self = $('form').validaty();

            // when
            self.submit();

            // then
            var message = self.children('.validaty-balloon').find('li');

            expect(message).toHaveHtml('Should be checked!');
          });
        });

        context('select', function() {
          beforeEach(function() { form(select('required', 1)); });

          it ('formats the right text', function() {
            // given
            var self = $('form').validaty();

            // when
            self.submit();

            // then
            var message = self.children('.validaty-balloon').find('li');

            expect(message).toHaveHtml('Should be selected!');
          });
        });
      });

      describe('number', function() {
        beforeEach(function() { form(input('text', 'number', 'notnumber')); });

        it ('formats the right text', function() {
          // given
          var self = $('form').validaty();

          // when
          self.submit();

          // then
          var message = self.children('.validaty-balloon').find('li');

          expect(message).toHaveHtml('Must be a number!');
        });
      });

      describe('email', function() {
        beforeEach(function() { form(input('text', 'email', 'notemail')); });

        it ('formats the right text', function() {
          // given
          var self = $('form').validaty();

          // when
          self.submit();

          // then
          var message = self.children('.validaty-balloon').find('li');

          expect(message).toHaveHtml('Must be a valid e-mail!');
        });
      });

      describe('minlength', function() {
        beforeEach(function() { form(input('text', 'minlength:3', '12')); });

        it ('formats the right text', function() {
          // given
          var self = $('form').validaty();

          // when
          self.submit();

          // then
          var message = self.children('.validaty-balloon').find('li');

          expect(message).toHaveHtml('Too short (minimum is 3 characters)!');
        });
      });

      describe('maxlength', function() {
        beforeEach(function() { form(input('text', 'maxlength:2', '123')); });

        it ('formats the right text', function() {
          // given
          var self = $('form').validaty();

          // when
          self.submit();

          // then
          var message = self.children('.validaty-balloon').find('li');

          expect(message).toHaveHtml('Too long (maximum is 2 characters)!');
        });
      });

      describe('rangelength', function() {
        beforeEach(function() { form(input('text', 'rangelength:2:3', 'a')); });

        it ('formats the right text', function() {
          // given
          var self = $('form').validaty();

          // when
          self.submit();

          // then
          var message = self.children('.validaty-balloon').find('li');

          expect(message).toHaveHtml('Wrong length (minimum is 2 and maximum is 3 characters)!');
        });
      });

      describe('range', function() {
        beforeEach(function() { form(input('text', 'range:2:4', '1')); });

        it ('formats the right text', function() {
          // given
          var self = $('form').validaty();

          // when
          self.submit();

          // then
          var message = self.children('.validaty-balloon').find('li');

          expect(message).toHaveHtml('Must be a number between 2 and 4!');
        });
      });

      describe('url', function() {
        beforeEach(function() { form(input('text', 'url', 'noturl')); });

        it ('formats the right text', function() {
          // given
          var self = $('form').validaty();

          // when
          self.submit();

          // then
          var message = self.children('.validaty-balloon').find('li');

          expect(message).toHaveHtml('Must be a valid URL!');
        });
      });

      describe('dateiso', function() {
        beforeEach(function() { form(input('text', 'dateiso', 'notdate')); });

        it ('formats the right text', function() {
          // given
          var self = $('form').validaty();

          // when
          self.submit();

          // then
          var message = self.children('.validaty-balloon').find('li');

          expect(message).toHaveHtml('Must be a valid date ISO (yyyy-MM-dd)!');
        });
      });

      describe('contain', function() {
        beforeEach(function() { form(input('text', 'contain:word', 'notfound')); });

        it ('formats the right text', function() {
          // given
          var self = $('form').validaty();

          // when
          self.submit();

          // then
          var message = self.children('.validaty-balloon').find('li');

          expect(message).toHaveHtml('Must contain "word"!');
        });
      });

      describe('equal', function() {
        context('without space', function() {
          beforeEach(function() { form(input('text', 'equal:text', 'different')); });

          it ('formats the right text', function() {
            // given
            var self = $('form').validaty();

            // when
            self.submit();

            // then
            var message = self.children('.validaty-balloon').find('li');

            expect(message).toHaveHtml('Must be equals to "text"!');
          });
        });

        context('with space', function() {
          beforeEach(function() { form(input('text', 'equal:my%20text', 'different')); });

          it ('formats the right text', function() {
            // given
            var self = $('form').validaty();

            // when
            self.submit();

            // then
            var message = self.children('.validaty-balloon').find('li');

            expect(message).toHaveHtml('Must be equals to "my text"!');
          });
        });
      });

      describe('digits', function() {
        beforeEach(function() { form(input('text', 'digits', 'notdigit')); });

        it ('formats the right text', function() {
          // given
          var self = $('form').validaty();

          // when
          self.submit();

          // then
          var message = self.children('.validaty-balloon').find('li');

          expect(message).toHaveHtml('Must be digits!');
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

          waits(450);

          // when
          runs(function() {
            balloons2.first().mouseover();
          });

          waits(450);

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
      context('with two differents validation', function() {
        beforeEach(function() { form(input('text', 'required number')); });

        context('and one invalid', function() {
          it ('receives the invalid class', function() {
            // given
            var self   = $('form').validaty(),
                inputs = self.children('input');

            // when
            self.submit();

            // then
            expect(inputs.first()).not.toHaveClass('valid');
            expect(inputs.last()).not.toHaveClass('valid');
          });
        });
      });

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

  describe('helpers', function() {
    describe('#getValidations', function() {
      describe('without space character at all', function() {
        beforeEach(function() { form(input('text', 'validation:1:string:3')); });

        it ('returns the validations with args', function() {
          // given
          var self     = $('form').validaty(),
              input    = self.children('input'),
              helper   = self.validaty('helper'),
              expected = [{ validation: 'validation', args: [1, 'string', 3] }];

          // when
          var validations = helper.getValidations(input);

          // then
          expect(validations).toEqual(expected);
        });
      });

      describe('with space character on validation', function() {
        beforeEach(function() { form(input('text', 'my%20validation:1:string:3')); });

        it ('returns the validations with character', function() {
          // given
          var self     = $('form').validaty(),
              input    = self.children('input'),
              helper   = self.validaty('helper'),
              expected = [{ validation: 'my%20validation', args: [1, 'string', 3] }];

          // when
          var validations = helper.getValidations(input);

          // then
          expect(validations).toEqual(expected);
        });
      });

      describe('with space character on args', function() {
        beforeEach(function() { form(input('text', 'validation:1:My%20String:3')); });

        it ('returns the validations with args', function() {
          // given
          var self     = $('form').validaty(),
              input    = self.children('input'),
              helper   = self.validaty('helper'),
              expected = [{ validation: 'validation', args: [1, 'My String', 3] }];

          // when
          var validations = helper.getValidations(input);

          // then
          expect(validations).toEqual(expected);
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
        expect(opt.validators.contain.message).toEqual('Must contain "{word}"!');
        expect(opt.validators.dateiso.message).toEqual('Must be a valid date ISO (yyyy-MM-dd)!');
        expect(opt.validators.digits.message).toEqual('Must be digits!');
        expect(opt.validators.email.message).toEqual('Must be a valid e-mail!');
        expect(opt.validators.equal.message).toEqual('Must be equals to "{value}"!');
        expect(opt.validators.maxlength.message).toEqual('Too long (maximum is {max} characters)!');
        expect(opt.validators.minlength.message).toEqual('Too short (minimum is {min} characters)!');
        expect(opt.validators.number.message).toEqual('Must be a number!');
        expect(opt.validators.range.message).toEqual('Must be a number between {min} and {max}!');
        expect(opt.validators.rangelength.message).toEqual('Wrong length (minimum is {min} and maximum is {max} characters)!');
        expect(opt.validators.required.message.checkbox).toEqual('Should be checked!');
        expect(opt.validators.required.message.radio).toEqual('Should be chosen!');
        expect(opt.validators.required.message.select).toEqual('Should be selected!');
        expect(opt.validators.required.message.text).toEqual("Can't be blank or empty!");
        expect(opt.validators.url.message).toEqual('Must be a valid URL!');
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

    describe('email', function() {
      beforeEach(function() {
        form(input('text', 'email'));

        this.form  = $('form').validaty(),
        this.input = this.form.children('input');
      });

      it ('pass', function() {
        this.input.val('');
        expect(validate(this)).toBeTruthy();

        this.input.val(' ');
        expect(validate(this)).toBeTruthy();

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

    describe('number', function() {
      beforeEach(function() {
        form(input('text', 'number'));

        this.form  = $('form').validaty(),
        this.input = this.form.children('input');
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

    describe('required', function() {
      context('for text field', function() {
        beforeEach(function() {
          form(input('text', 'required'));

          this.form  = $('form').validaty(),
          this.input = this.form.children('input');
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

          this.form  = $('form').validaty(),
          this.input = this.form.children('input');
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

          this.form  = $('form').validaty(),
          this.input = this.form.children('input');
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

    describe('minlength', function() {
      context('for text field', function() {
        beforeEach(function() {
          form(input('text', 'minlength:2'));

          this.form  = $('form').validaty(),
          this.input = this.form.children('input');
        });

        it ('pass', function() {
          this.input.val('');
          expect(validate(this)).toBeTruthy();

          this.input.val(' ');
          expect(validate(this)).toBeTruthy();

          this.input.val('12');
          expect(validate(this)).toBeTruthy();

          this.input.val('123');
          expect(validate(this)).toBeTruthy();
        });

        it ('fails', function() {
          this.input.val('1');
          expect(validate(this)).toBeFalsy();
        });
      });
    });

    describe('maxlength', function() {
      context('for text field', function() {
        beforeEach(function() {
          form(input('text', 'maxlength:2'));

          this.form  = $('form').validaty(),
          this.input = this.form.children('input');
        });

        it ('pass', function() {
          this.input.val('');
          expect(validate(this)).toBeTruthy();

          this.input.val('   ');
          expect(validate(this)).toBeTruthy();

          this.input.val('1');
          expect(validate(this)).toBeTruthy();

          this.input.val('12');
          expect(validate(this)).toBeTruthy();
        });

        it ('fails', function() {
          this.input.val('123');
          expect(validate(this)).toBeFalsy();

          this.input.val('1234');
          expect(validate(this)).toBeFalsy();
        });
      });
    });

    describe('rangelength', function() {
      context('for text field', function() {
        beforeEach(function() {
          form(input('text', 'rangelength:2:3'));

          this.form  = $('form').validaty(),
          this.input = this.form.children('input');
        });

        it ('pass', function() {
          this.input.val('');
          expect(validate(this)).toBeTruthy();

          this.input.val('    ');
          expect(validate(this)).toBeTruthy();

          this.input.val('12');
          expect(validate(this)).toBeTruthy();

          this.input.val('123');
          expect(validate(this)).toBeTruthy();
        });

        it ('fails', function() {
          this.input.val('1');
          expect(validate(this)).toBeFalsy();

          this.input.val('1234');
          expect(validate(this)).toBeFalsy();
        });
      });
    });

    describe('range', function() {
      context('for text field', function() {
        beforeEach(function() {
          form(input('text', 'range:2:4'));

          this.form  = $('form').validaty(),
          this.input = this.form.children('input');
        });

        it ('pass', function() {
          this.input.val('');
          expect(validate(this)).toBeTruthy();

          this.input.val('    ');
          expect(validate(this)).toBeTruthy();

          this.input.val('2');
          expect(validate(this)).toBeTruthy();

          this.input.val('3');
          expect(validate(this)).toBeTruthy();

          this.input.val(4);
          expect(validate(this)).toBeTruthy();
        });

        it ('fails', function() {
          this.input.val('1');
          expect(validate(this)).toBeFalsy();

          this.input.val(5);
          expect(validate(this)).toBeFalsy();
        });
      });
    });

    describe('url', function() {
      context('for text field', function() {
        beforeEach(function() {
          form(input('text', 'url'));

          this.form  = $('form').validaty(),
          this.input = this.form.children('input');
        });

        it ('pass', function() {
          this.input.val('');
          expect(validate(this)).toBeTruthy();

          this.input.val('http://wbotelhos.com');
          expect(validate(this)).toBeTruthy();

          this.input.val('https://wbotelhos.com.br');
          expect(validate(this)).toBeTruthy();

          this.input.val('ftp://wbotelhos.com');
          expect(validate(this)).toBeTruthy();

          this.input.val('sftp://wbotelhos.com');
          expect(validate(this)).toBeTruthy();

          this.input.val('git://wbotelhos.com');
          expect(validate(this)).toBeTruthy();
        });

        it ('fails', function() {
          this.input.val('    ');
          expect(validate(this)).toBeFalsy();

          this.input.val('wbotelhos');
          expect(validate(this)).toBeFalsy();

          this.input.val('wbotelhos.com');
          expect(validate(this)).toBeFalsy();

          this.input.val('http://wbotelhos');
          expect(validate(this)).toBeFalsy();
        });
      });
    });

    describe('dateiso', function() {
      context('for text field', function() {
        beforeEach(function() {
          form(input('text', 'dateiso'));

          this.form  = $('form').validaty(),
          this.input = this.form.children('input');
        });

        it ('pass', function() {
          this.input.val('');
          expect(validate(this)).toBeTruthy();

          this.input.val('    ');
          expect(validate(this)).toBeTruthy();

          this.input.val('1984-10-23');
          expect(validate(this)).toBeTruthy();
        });

        it ('fails', function() {
          this.input.val('1984/10/23');
          expect(validate(this)).toBeFalsy();

          this.input.val('23/10/1984');
          expect(validate(this)).toBeFalsy();

          this.input.val('23-10-1984');
          expect(validate(this)).toBeFalsy();

          this.input.val('1984_10_23');
          expect(validate(this)).toBeFalsy();
        });
      });
    });

    describe('contain', function() {
      context('for text field', function() {
        beforeEach(function() {
          form(input('text', 'contain:word'));

          this.form  = $('form').validaty(),
          this.input = this.form.children('input');
        });

        it ('pass', function() {
          this.input.val('');
          expect(validate(this)).toBeTruthy();

          this.input.val('word');
          expect(validate(this)).toBeTruthy();

          this.input.val('xword');
          expect(validate(this)).toBeTruthy();

          this.input.val('xwordx');
          expect(validate(this)).toBeTruthy();
        });

        it ('fails', function() {
          this.input.val(' ');
          expect(validate(this)).toBeFalsy();

          this.input.val('wor');
          expect(validate(this)).toBeFalsy();
        });
      });
    });

    describe('equal', function() {
      context('for text field', function() {
        beforeEach(function() {
          form(input('text', 'equal:123'));

          this.form  = $('form').validaty(),
          this.input = this.form.children('input');
        });

        it ('pass', function() {
          this.input.val('');
          expect(validate(this)).toBeTruthy();

          this.input.val('123');
          expect(validate(this)).toBeTruthy();

          this.input.val(123);
          expect(validate(this)).toBeTruthy();
        });

        it ('fails', function() {
          this.input.val(' ');
          expect(validate(this)).toBeFalsy();

          this.input.val('1');
          expect(validate(this)).toBeFalsy();

          this.input.val('12');
          expect(validate(this)).toBeFalsy();

          this.input.val('1234');
          expect(validate(this)).toBeFalsy();
        });
      });
    });

    describe('digits', function() {
      context('for text field', function() {
        beforeEach(function() {
          form(input('text', 'digits'));

          this.form  = $('form').validaty(),
          this.input = this.form.children('input');
        });

        it ('pass', function() {
          this.input.val('');
          expect(validate(this)).toBeTruthy();

          this.input.val('1');
          expect(validate(this)).toBeTruthy();

          this.input.val(2);
          expect(validate(this)).toBeTruthy();
        });

        it ('fails', function() {
          this.input.val(' ');
          expect(validate(this)).toBeFalsy();

          this.input.val('a');
          expect(validate(this)).toBeFalsy();

          this.input.val('-1');
          expect(validate(this)).toBeFalsy();

          this.input.val(-1);
          expect(validate(this)).toBeFalsy();

          this.input.val(1.2);
          expect(validate(this)).toBeFalsy();
        });
      });
    });
  });
});
