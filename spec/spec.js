describe('Validaty', function() {
  afterEach(function() { Helper.clear(); });

  describe('actions', function() {
    context('submit', function() {
      beforeEach(function() {
        Helper.append(Helper.form({
          html: Helper.text({ 'data-validaty': 'required' })
        }));
      });

      it ('triggers the validation', function() {
        // given
        var self = $('form').validaty();

        // when
        self.submit();

        // then
        expect(self.children('.validaty-balloon')).toExist();
      });
    });

    context('others binds', function() {
      context('blur', function() {
        beforeEach(function() {
          Helper.append(Helper.form({
            html: [
              Helper.text({ 'data-validaty': 'required on:blur' }),
              Helper.text()
            ]
          }));
        });

        it ('triggers the validation', function() {
          // given
          var self  = $('form').validaty();
              input = self.children('input:first').focus();

          // when
          input.blur();

          // then
          expect(self.children('.validaty-balloon')).toExist();
        });

        it ('does not focus back the blured field on error', function() {
          // given
          var self   = $('form').validaty();
              inputs = self.children('input');

          inputs.first().focus();

          // when
          inputs.last().focus();

          // then
          expect(inputs.last()).toBeFocused();
        });
      });

      context('focus', function() {
        beforeEach(function() {
          Helper.append(Helper.form({
            html: Helper.text({ 'data-validaty': 'required on:focus' })
          }));
        });

        it ('triggers the validation and does not trigger a infinite looping', function() {
          // given
          var self  = $('form').validaty();
              input = self.children('input').blur();

          // when
          input.focus();

          // then
          expect(self.children('.validaty-balloon')).toExist();
        });
      });

      context('with two fields inside the same form', function() {
        context('on trriger the action of one of it', function() {
          beforeEach(function() {
            Helper.append(Helper.form({
              html: [
                Helper.text({ 'data-validaty': 'digits on:focus' }),
                Helper.text({ 'data-validaty': 'required' })
              ]
            }));
          });

          it ('does not valid the other', function() {
            // given
            var self  = $('form').validaty();
                first = self.children('input:first');

            // when
            first.focus();

            // then
            expect(self.children('.validaty-balloon')).not.toExist();
          });

          it ('does not removes the validation of the other', function() {
            // given
            var self  = $('form').validaty();
                first = self.children('input:first');

            self.submit();

            // when
            first.focus();

            // then
            expect(self.children('.validaty-balloon')).toExist();
          });
        });
      });
    });
  });

  describe('balloon', function() {
    context('message', function() {
      describe('required', function() {
        context('text', function() {
          beforeEach(function() {
            Helper.append(Helper.form({ html: Helper.text({ 'data-validaty': 'required' }) }));
          });

          it ('shows up', function() {
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
          beforeEach(function() {
            Helper.append(Helper.form({
              html: Helper.radio({ name: 'name', 'data-validaty': 'required', selected: true })
            }));
          });

          it ('shows up', function() {
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
          beforeEach(function() {
            Helper.append(Helper.form({
              html: Helper.checkbox({ name: 'name', 'data-validaty': 'required' })
            }));
          });

          it ('shows up', function() {
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
          beforeEach(function() {
            Helper.append(Helper.form({ html: Helper.select({ 'data-validaty': 'required' }) }));
          });

          it ('shows up', function() {
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
        beforeEach(function() {
          Helper.append(Helper.form({ html: Helper.text({ value: 'invalid', 'data-validaty': 'number' }) }));
        });

        it ('shows up', function() {
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
        beforeEach(function() {
          Helper.append(Helper.form({ html: Helper.text({ value: 'invalid', 'data-validaty': 'email' }) }));
        });

        it ('shows up', function() {
          // given
          var self = $('form').validaty();

          // when
          self.submit();

          // then
          var message = self.children('.validaty-balloon').find('li');

          expect(message).toHaveHtml('Must be a valid e-mail!');
        });
      });

      describe('maxcheck', function() {
        beforeEach(function() {
          Helper.append(
            Helper.form({
              html: Helper.checkbox({ name: 'name', 'data-validaty': 'maxcheck:2', times: 3, checked: true })
            })
          );
        });

        it ('shows up', function() {
          // given
          var self = $('form').validaty();

          // when
          self.submit();

          // then
          var message = self.children('.validaty-balloon').find('li');

          expect(message).toHaveHtml('Check at most 2 checkboxes!');
        });
      });

      describe('maxlength', function() {
        beforeEach(function() {
          Helper.append(Helper.form({ html: Helper.text({ value: '123', 'data-validaty': 'maxlength:2' }) }));
        });

        it ('shows up', function() {
          // given
          var self = $('form').validaty();

          // when
          self.submit();

          // then
          var message = self.children('.validaty-balloon').find('li');

          expect(message).toHaveHtml('Too long (max is 2 characters)!');
        });
      });

      describe('maxselect', function() {
        beforeEach(function() {
          Helper.append(
            Helper.form({
              html: Helper.select({
                multiple: true, 'data-validaty': 'maxselect:1',
                html: Helper.option({ selected: true, html: '{index}', times: 2 })
              })
            })
          );
        });

        it ('shows up', function() {
          // given
          var self = $('form').validaty();

          // when
          self.submit();

          // then
          var message = self.children('.validaty-balloon').find('li');

          expect(message).toHaveHtml('Select at most 1 options!');
        });
      });

      describe('mincheck', function() {
        context('selecting elements that is not belongs the validated group', function() {
          beforeEach(function() {
            Helper.append(Helper.form({
              html: [
                Helper.checkbox({ name: 'name', 'data-validaty': 'mincheck:1' }),
                Helper.checkbox({ name: 'other', 'data-validaty': 'mincheck:1', checked: true })
              ]
            }));
          });

          it ('shows up', function() {
            // given
            var self = $('form').validaty();

            // when
            self.submit();

            // then
            var message = self.children('.validaty-balloon').find('li');

            expect(message).toHaveHtml('Check at least 1 checkboxes!');
          });
        });

        context('with only one of the group binded', function() {
          beforeEach(function() {
            Helper.append(Helper.form({ html: Helper.checkbox({ name: 'name', 'data-validaty': 'mincheck:1' }) }));
          });

          it ('shows up', function() {
            // given
            var self = $('form').append(Helper.checkbox({ name: 'other' })).validaty();

            // when
            self.submit();

            // then
            var message = self.children('.validaty-balloon').find('li');

            expect(message).toHaveHtml('Check at least 1 checkboxes!');
          });
        });
      });

      describe('minlength', function() {
        beforeEach(function() {
          Helper.append(Helper.form({ html: Helper.text({ value: '12', 'data-validaty': 'minlength:3' }) }));
        });

        it ('shows up', function() {
          // given
          var self = $('form').validaty();

          // when
          self.submit();

          // then
          var message = self.children('.validaty-balloon').find('li');

          expect(message).toHaveHtml('Too short (min is 3 characters)!');
        });
      });

      describe('minselect', function() {
        beforeEach(function() {
          Helper.append(
            Helper.form({
              html: Helper.select({
                multiple: true, 'data-validaty': 'minselect:1',
                html: Helper.option()
              })
            })
          );
        });

        it ('shows up', function() {
          // given
          var self = $('form').validaty();

          // when
          self.submit();

          // then
          var message = self.children('.validaty-balloon').find('li');

          expect(message).toHaveHtml('Select at least 1 options!');
        });
      });

      describe('range', function() {
        beforeEach(function() {
          Helper.append(Helper.form({ html: Helper.text({ value: '1', 'data-validaty': 'range:2:4' }) }));
        });

        it ('shows up', function() {
          // given
          var self = $('form').validaty();

          // when
          self.submit();

          // then
          var message = self.children('.validaty-balloon').find('li');

          expect(message).toHaveHtml('Must be a number between 2 and 4!');
        });
      });

      describe('rangecheck', function() {
        beforeEach(function() {
          Helper.append(Helper.form({
            html: Helper.checkbox({ name: 'name', 'data-validaty': 'rangecheck:1:2', times: 2 })
          }));
        });

        it ('shows up', function() {
          // given
          var self = $('form').validaty();

          // when
          self.submit();

          // then
          var message = self.children('.validaty-balloon').find('li');

          expect(message).toHaveHtml('Check between 1 and 2 checkboxes!');
        });
      });

      describe('rangelength', function() {
        beforeEach(function() {
          Helper.append(Helper.form({ html: Helper.text({ value: 'a', 'data-validaty': 'rangelength:2:3' }) }));
        });

        it ('shows up', function() {
          // given
          var self = $('form').validaty();

          // when
          self.submit();

          // then
          var message = self.children('.validaty-balloon').find('li');

          expect(message).toHaveHtml('Wrong length (min is 2 and max is 3 characters)!');
        });
      });

      describe('rangeselect', function() {
        beforeEach(function() {
          Helper.append(
            Helper.form({
              html: Helper.select({
                multiple: true, 'data-validaty': 'rangeselect:1:2',
                html: Helper.option()
              })
            })
          );
        });

        it ('shows up', function() {
          // given
          var self = $('form').validaty();

          // when
          self.submit();

          // then
          var message = self.children('.validaty-balloon').find('li');

          expect(message).toHaveHtml('Select between 1 and 2 options!');
        });
      });

      describe('url', function() {
        beforeEach(function() {
          Helper.append(Helper.form({ html: Helper.text({ value: 'invalid', 'data-validaty': 'url' }) }));
        });

        it ('shows up', function() {
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
        beforeEach(function() {
          Helper.append(Helper.form({ html: Helper.text({ value: 'invalid', 'data-validaty': 'dateiso' }) }));
        });

        it ('shows up', function() {
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
        beforeEach(function() {
          Helper.append(Helper.form({ html: Helper.text({ value: 'invalid', 'data-validaty': 'contain:word' }) }));
        });

        it ('shows up', function() {
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
          beforeEach(function() {
            Helper.append(Helper.form({ html: Helper.text({ value: 'invalid', 'data-validaty': 'equal:text' }) }));
          });

          it ('shows up', function() {
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
          beforeEach(function() {
            Helper.append(Helper.form({ html: Helper.text({ value: 'invalid', 'data-validaty': 'equal:my%20text' }) }));
          });

          it ('shows up', function() {
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
        beforeEach(function() {
          Helper.append(Helper.form({ html: Helper.text({ value: 'invalid', 'data-validaty': 'digits' }) }));
        });

        it ('shows up', function() {
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
        Helper.append(Helper.form({ html: Helper.text({ 'data-validaty': 'required', times: 2 }) }));
        Helper.append(Helper.form({ html: Helper.text({ 'data-validaty': 'required' }) }));
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

    describe('hash', function() {
      beforeEach(function() {
        Helper.append(Helper.form({ html: Helper.text({ 'data-validaty': 'required' }) }));
      });

      it ('receives the field hash as ID', function() {
        // given
        var self = $('form').validaty(),
            hash = self.children('input')[0].hash;

        // when
        self.submit();

        // then
        expect(self.children('.validaty-balloon').attr('id')).toEqual(hash);
      });
    });
  });

  describe('fields', function() {
    context('binded', function() {
      beforeEach(function() {
        Helper.append(Helper.form({ html: Helper.text({ 'data-validaty': 'required' }) }));
      });

      it ('receives a hash', function() {
        // given
        var self = $('form').validaty();

        // when
        var hash = self.children('input:first')[0].hash;

        // then
        expect(hash).not.toBeEmpty();
      });
    });

    context('not binded', function() {
      beforeEach(function() {
        Helper.append(Helper.form({ html: Helper.text() }));
      });

      it ('does not receives a hash', function() {
        // given
        var self = $('form').validaty();

        // when
        var hash = self.children('input:first')[0].hash;

        // then
        expect(hash).toBeUndefined();
      });
    });

    context('insided elements', function() {
      beforeEach(function() {
        Helper.append(Helper.form({ html: '<p>' + Helper.text({ 'data-validaty': 'required' }) + '</p>' }));
      });

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
        beforeEach(function() {
          Helper.append(Helper.form({ html: Helper.text({ 'data-validaty': 'required number' }) }));
        });

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
        beforeEach(function() {
          Helper.append(Helper.form({ html: Helper.text({ 'data-validaty': 'required', times: 2 }) }));
        });

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
            expect(self.children('input:first')).toHaveClass('invalid');
            expect(self.children('input:last')).toHaveClass('invalid');
          });
        });
      });
    });

    describe('checkbox', function() {
      context('with more than one', function() {
        beforeEach(function() {
          Helper.append(Helper.form({
            onsubmit: 'return false;',
            html: Helper.checkbox({ name: 'name', 'data-validaty': 'required', times: 2 })
          }));
        });

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
        beforeEach(function() {
          Helper.append(Helper.form({
            onsubmit: 'return false;',
            html: Helper.radio({ name: 'name', 'data-validaty': 'required', times: 2 })
          }));
        });

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
      beforeEach(function() {
        Helper.append(Helper.form({ onsubmit: 'return false;' }));
      });

      it ('is not included on validation', function() {
        // given
        var self  = $('form').validaty(),
            input = Helper.text({ 'data-validaty': 'required' });

        // when
        self.append(input).submit();

        // then
        expect(self.children('.validaty-balloon')).not.toExist();
      });
    });

    context('with validation not registered', function() {
      beforeEach(function() {
        Helper.append(Helper.form({ html: Helper.text({ 'data-validaty': 'notfound' }) }));
      });

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
      beforeEach(function() {
        Helper.append(Helper.form());
      });

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
  });

  describe('functions', function() {
    afterEach(function() { Helper.clear(); });

    describe('#destroy', function() {
      beforeEach(function() {
        Helper.append(Helper.form());
      });

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
      beforeEach(function() {
        Helper.append(Helper.form({ html: Helper.text({ 'data-validaty': 'required' }) }));
      });

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
      beforeEach(function() {
        Helper.append(Helper.form());
      });

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
    describe('#getParams', function() {
      context('without space character at all', function() {
        beforeEach(function() {
          Helper.append(Helper.form({ html: Helper.text({ 'data-validaty': 'validation:1:string:3 on:focus:blur on:keyup' }) }));
        });

        it ('returns the validations with args', function() {
          // given
          var self     = $('form').validaty(),
              input    = self.children('input'),
              helper   = self.validaty('helper'),
              expected = {
                validations: [{ name: 'validation', args: [1, 'string', 3] }],
                actions    : [{ name: 'on', args: ['focus', 'blur'] }, { name: 'on', args: ['keyup'] }]
              };

          // when
          var validations = helper.getParams(input);

          // then
          expect(validations).toEqual(expected);
        });
      });

      context('with space character on validation', function() {
        beforeEach(function() {
          Helper.append(Helper.form({ html: Helper.text({ 'data-validaty': 'my%20validation:1:string:3' }) }));
        });

        it ('returns the validations with character', function() {
          // given
          var self     = $('form').validaty(),
              input    = self.children('input'),
              helper   = self.validaty('helper'),
              expected = {
                validations: [{ name: 'my%20validation', args: [1, 'string', 3] }],
                actions    : []
              };

          // when
          var validations = helper.getParams(input);

          // then
          expect(validations).toEqual(expected);
        });
      });

      context('with space character on args', function() {
        beforeEach(function() {
          Helper.append(Helper.form({ html: Helper.text({ 'data-validaty': 'validation:1:My%20String:3' }) }));
        });

        it ('returns the validations with args', function() {
          // given
          var self     = $('form').validaty(),
              input    = self.children('input'),
              helper   = self.validaty('helper'),
              expected = {
                validations: [{ name: 'validation', args: [1, 'My String', 3] }],
                actions    : []
              };

          // when
          var validations = helper.getParams(input);

          // then
          expect(validations).toEqual(expected);
        });
      });

      context('without the data-validaty attribute', function() {
        beforeEach(function() {
          Helper.append(Helper.form({ html: Helper.text() }));
        });

        it ('returns undefined', function() {
          // given
          var self     = $('form').validaty(),
              input    = self.children('input'),
              helper   = self.validaty('helper');

          // when
          var params = helper.getParams(input);

          // then
          expect(params).toBeUndefined();
        });
      });
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
      expect(opt.fadeSpeed).toEqual(200);
      expect(opt.ignore).toEqual(':submit, :reset, :image, :disabled');
    });

    describe('focus', function() {
      context('with all fields visible', function() {
        beforeEach(function() {
          Helper.append(Helper.form({ html: Helper.text({ 'data-validaty': 'required', times: 2 }) }));
        });

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

    context('with the first field hidden', function() {
      beforeEach(function() {
        Helper.append(Helper.form({
          html: [
            Helper.text({ 'data-validaty': 'required', style: 'display: none;' }),
            Helper.text({ 'data-validaty': 'required', times: 2 }),
          ]
        }));
      });

      context('as "first"', function() {
        it ('focus the first one', function() {
          // given
          var self = $('form').validaty({ focus: 'first' });

          // when
          self.submit();

          // then
          expect(self.children(':input:visible:first')).toBeFocused();
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
        expect(opt.validators.maxcheck.message).toEqual('Check at most {max} checkboxes!');
        expect(opt.validators.maxlength.message).toEqual('Too long (max is {max} characters)!');
        expect(opt.validators.maxselect.message).toEqual('Select at most {max} options!');
        expect(opt.validators.mincheck.message).toEqual('Check at least {min} checkboxes!');
        expect(opt.validators.minlength.message).toEqual('Too short (min is {min} characters)!');
        expect(opt.validators.minselect.message).toEqual('Select at least {min} options!');
        expect(opt.validators.number.message).toEqual('Must be a number!');
        expect(opt.validators.range.message).toEqual('Must be a number between {min} and {max}!');
        expect(opt.validators.rangecheck.message).toEqual('Check between {min} and {max} checkboxes!');
        expect(opt.validators.rangelength.message).toEqual('Wrong length (min is {min} and max is {max} characters)!');
        expect(opt.validators.rangeselect.message).toEqual('Select between {min} and {max} options!');
        expect(opt.validators.required.message.checkbox).toEqual('Should be checked!');
        expect(opt.validators.required.message.radio).toEqual('Should be chosen!');
        expect(opt.validators.required.message.select).toEqual('Should be selected!');
        expect(opt.validators.required.message.text).toEqual("Can't be blank or empty!");
        expect(opt.validators.url.message).toEqual('Must be a valid URL!');
        expect(opt.validators.username.message).toEqual('Must be a valid username (a-z, A-Z and _) only!');
      });

      context('with details message', function() {
        beforeEach(function() {
          $.validaty.register('mock', {}, function() { return false; });
        });

        context('and match attribute', function() {
          context('for "input" type', function() {
            beforeEach(function() {
              $.fn.validaty.defaults.validators.mock.message['someType'] = 'someType'
              Helper.append(Helper.form({ html: Helper.input({ type: 'someType', 'data-validaty': 'mock' }) }));
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
              Helper.append(Helper.form({ html: Helper.select({ 'data-validaty': 'mock', times: 2 }) }));
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
            Helper.append(Helper.form({ html: Helper.input({ type: 'type', 'data-validaty': 'mock' }) }));
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
        Helper.append(Helper.form({ html: Helper.text({ 'data-validaty': 'email' }) }));

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
        Helper.append(Helper.form({ html: Helper.text({ 'data-validaty': 'number' }) }));

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
          Helper.append(Helper.form({ html: Helper.text({ 'data-validaty': 'required' }) }));

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
          Helper.append(Helper.form({
            html: [
              Helper.radio({ name: 'name', 'data-validaty': 'required', selected: true }),
              Helper.radio({ name: 'name', 'data-validaty': 'required' })
            ]
          }));

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
          Helper.append(Helper.form({
            html: [
              Helper.radio({ name: 'name', 'data-validaty': 'required', selected: true }),
              Helper.radio({ name: 'name', 'data-validaty': 'required' })
            ]
          }));

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

    describe('maxcheck', function() {
      context('without disabled', function() {
        beforeEach(function() {
          Helper.append(
            Helper.form({
              html: Helper.checkbox({ name: 'name', 'data-validaty': 'maxcheck:2', times: 3 })
            })
          );

          this.form  = $('form').validaty(),
          this.input = this.form.children('input');
        });

        it ('pass', function() {
          this.input.eq(0).attr('checked', 'checked');
          expect(validate(this)).toBeTruthy();

          this.input.eq(1).attr('checked', 'checked');
          expect(validate(this)).toBeTruthy();
        });

        it ('fails', function() {
          this.input.attr('checked', 'checked');
          expect(validate(this)).toBeFalsy();
        });
      });

      context('with disabled', function() {
        beforeEach(function() {
          Helper.append(
            Helper.form({
              html: Helper.checkbox({ name: 'name', 'data-validaty': 'maxcheck:2', times: 3, checked: true, disabled: true })
            })
          );

          this.form  = $('form').validaty(),
          this.input = this.form.children('input');
        });

        it ('pass ignoring the disabled inputs', function() {
          expect(validate(this)).toBeTruthy();
        });
      });
    });

    describe('maxlength', function() {
      context('for text field', function() {
        beforeEach(function() {
          Helper.append(Helper.form({ html: Helper.text({ 'data-validaty': 'maxlength:2' }) }));

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

    describe('maxselect', function() {
      context('without disabled', function() {
        beforeEach(function() {
          Helper.append(
            Helper.form({
              html: Helper.select({
                multiple: true, 'data-validaty': 'maxselect:1',
                html: Helper.option({ html: '{index}', times: 2 })
              })
            })
          );

          this.form    = $('form').validaty(),
          this.input   = this.form.children('select');
          this.options = this.input.children('option');
        });

        it ('pass', function() {
          this.options.eq(0).attr('selected', 'selected');
          expect(validate(this)).toBeTruthy();
        });

        it ('fails', function() {
          this.options.attr('selected', 'selected');
          expect(validate(this)).toBeFalsy();
        });
      });

      context('with disabled', function() {
        beforeEach(function() {
          Helper.append(
            Helper.form({
              html: Helper.select({
                multiple: true, 'data-validaty': 'maxselect:1',
                html: Helper.option({ html: '{index}', times: 2, selected: true, disabled: true })
              })
            })
          );

          this.form  = $('form').validaty(),
          this.input   = this.form.children('select');
          this.options = this.input.children('option');
        });

        it ('pass ignoring the disabled inputs', function() {
          expect(validate(this)).toBeTruthy();
        });
      });
    });

    describe('mincheck', function() {
      context('without disabled', function() {
        beforeEach(function() {
          Helper.append(
            Helper.form({
              html: Helper.checkbox({ name: 'name', 'data-validaty': 'mincheck:2', times: 3 })
            })
          );

          this.form  = $('form').validaty(),
          this.input = this.form.children('input');
        });

        it ('pass', function() {
          this.input.eq(0).attr('checked', 'checked');
          this.input.eq(1).attr('checked', 'checked');
          expect(validate(this)).toBeTruthy();

          this.input.eq(2).attr('checked', 'checked');
          expect(validate(this)).toBeTruthy();
        });

        it ('fails', function() {
          expect(validate(this)).toBeFalsy();
        });
      });

      context('with disabled', function() {
        beforeEach(function() {
          Helper.append(
            Helper.form({
              html: Helper.checkbox({ name: 'name', 'data-validaty': 'mincheck:2', times: 3, checked: true, disabled: true })
            })
          );

          this.form  = $('form').validaty(),
          this.input = this.form.children('input');
        });

        it ('pass ignoring the disabled inputs', function() {
          expect(validate(this)).toBeFalsy();
        });
      });
    });

    describe('minlength', function() {
      context('for text field', function() {
        beforeEach(function() {
          Helper.append(Helper.form({ html: Helper.text({ 'data-validaty': 'minlength:2' }) }));

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

    describe('minselect', function() {
      context('without disabled', function() {
        beforeEach(function() {
          Helper.append(
            Helper.form({
              html: Helper.select({
                multiple: true, 'data-validaty': 'minselect:1',
                html: Helper.option({ html: '{index}', times: 2 })
              })
            })
          );

          this.form    = $('form').validaty(),
          this.input   = this.form.children('select');
          this.options = this.input.children('option');
        });

        it ('pass', function() {
          this.options.eq(0).attr('selected', 'selected');
          expect(validate(this)).toBeTruthy();

          this.options.eq(1).attr('selected', 'selected');
          expect(validate(this)).toBeTruthy();
        });

        it ('fails', function() {
          expect(validate(this)).toBeFalsy();
        });
      });

      context('with disabled', function() {
        beforeEach(function() {
          Helper.append(
            Helper.form({
              html: Helper.select({
                multiple: true, 'data-validaty': 'minselect:1',
                html: Helper.option({ html: '{index}', times: 2, selected: true, disabled: true })
              })
            })
          );

          this.form    = $('form').validaty(),
          this.input   = this.form.children('select');
          this.options = this.input.children('option');
        });

        it ('pass ignoring the disabled inputs', function() {
          expect(validate(this)).toBeFalsy();
        });
      });
    });

    describe('rangecheck', function() {
      context('without disabled', function() {
        beforeEach(function() {
          Helper.append(
            Helper.form({
              html: Helper.checkbox({ name: 'name', 'data-validaty': 'rangecheck:1:2', times: 3 })
            })
          );

          this.form  = $('form').validaty(),
          this.input = this.form.children('input');
        });

        it ('pass', function() {
          this.input.eq(0).attr('checked', 'checked');
          expect(validate(this)).toBeTruthy();

          this.input.eq(1).attr('checked', 'checked');
          expect(validate(this)).toBeTruthy();
        });

        it ('fails', function() {
          expect(validate(this)).toBeFalsy();

          this.input.attr('checked', 'checked');
          expect(validate(this)).toBeFalsy();
        });
      });

      context('with disabled', function() {
        beforeEach(function() {
          Helper.append(
            Helper.form({
              html: Helper.checkbox({ name: 'name', 'data-validaty': 'rangecheck:1:2', times: 3, checked: true, disabled: true })
            })
          );

          this.form  = $('form').validaty(),
          this.input = this.form.children('input');
        });

        it ('pass ignoring the disabled inputs', function() {
          expect(validate(this)).toBeFalsy();
        });
      });
    });

    describe('rangelength', function() {
      context('for text field', function() {
        beforeEach(function() {
          Helper.append(Helper.form({ html: Helper.text({ 'data-validaty': 'rangelength:2:3' }) }));

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

    describe('rangeselect', function() {
      context('without disabled', function() {
        beforeEach(function() {
          Helper.append(
            Helper.form({
              html: Helper.select({
                multiple: true, 'data-validaty': 'rangeselect:1:2',
                html: Helper.option({ html: '{index}', times: 3 })
              })
            })
          );

          this.form    = $('form').validaty(),
          this.input   = this.form.children('select');
          this.options = this.input.children('option');
        });

        it ('pass', function() {
          this.options.eq(0).attr('selected', 'selected');
          expect(validate(this)).toBeTruthy();

          this.options.eq(1).attr('selected', 'selected');
          expect(validate(this)).toBeTruthy();
        });

        it ('fails', function() {
          expect(validate(this)).toBeFalsy();

          this.options.attr('selected', 'selected');
          expect(validate(this)).toBeFalsy();
        });
      });

      context('with disabled', function() {
        beforeEach(function() {
          Helper.append(
            Helper.form({
              html: Helper.select({
                multiple: true, 'data-validaty': 'rangeselect:1:2',
                html: Helper.option({ html: '{index}', selected: true, disabled: true })
              })
            })
          );

          this.form    = $('form').validaty(),
          this.input   = this.form.children('select');
          this.options = this.input.children('option');
        });

        it ('pass ignoring the disabled inputs', function() {
          expect(validate(this)).toBeFalsy();
        });
      });
    });

    describe('range', function() {
      context('for text field', function() {
        beforeEach(function() {
          Helper.append(Helper.form({ html: Helper.text({ 'data-validaty': 'range:2:4' }) }));

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
          Helper.append(Helper.form({ html: Helper.text({ 'data-validaty': 'url' }) }));

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
          Helper.append(Helper.form({ html: Helper.radio({ name: 'name', 'data-validaty': 'dateiso' }) }));

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
          Helper.append(Helper.form({ html: Helper.radio({ name: 'name', 'data-validaty': 'contain:word' }) }));

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
          Helper.append(Helper.form({ html: Helper.radio({ name: 'name', 'data-validaty': 'equal:123' }) }));

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
          Helper.append(Helper.form({ html: Helper.radio({ name: 'name', 'data-validaty': 'digits' }) }));

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

    describe('username', function() {
      context('for text field', function() {
        beforeEach(function() {
          Helper.append(Helper.form({ html: Helper.radio({ name: 'name', 'data-validaty': 'username' }) }));

          this.form  = $('form').validaty(),
          this.input = this.form.children('input');
        });

        it ('pass', function() {
          this.input.val('');
          expect(validate(this)).toBeTruthy();

          this.input.val('a');
          expect(validate(this)).toBeTruthy();

          this.input.val('a_b');
          expect(validate(this)).toBeTruthy();

          this.input.val('a_bc_d');
          expect(validate(this)).toBeTruthy();

          this.input.val('1');
          expect(validate(this)).toBeTruthy();

          this.input.val('1_2');
          expect(validate(this)).toBeTruthy();

          this.input.val('1_23_45');
          expect(validate(this)).toBeTruthy();
        });

        it ('fails', function() {
          this.input.val(' ');
          expect(validate(this)).toBeFalsy();

          this.input.val('_');
          expect(validate(this)).toBeFalsy();

          this.input.val('o_');
          expect(validate(this)).toBeFalsy();

          this.input.val('1_');
          expect(validate(this)).toBeFalsy();

          this.input.val('1_2_');
          expect(validate(this)).toBeFalsy();

          this.input.val('a_b_');
          expect(validate(this)).toBeFalsy();

          this.input.val('_o');
          expect(validate(this)).toBeFalsy();

          this.input.val('o__');
          expect(validate(this)).toBeFalsy();

          this.input.val('o__o');
          expect(validate(this)).toBeFalsy();

          this.input.val('_1');
          expect(validate(this)).toBeFalsy();

          this.input.val('the@user');
          expect(validate(this)).toBeFalsy();

          this.input.val('the-user');
          expect(validate(this)).toBeFalsy();

          this.input.val('(theuser)');
          expect(validate(this)).toBeFalsy();
        });
      });
    });
  });
});
