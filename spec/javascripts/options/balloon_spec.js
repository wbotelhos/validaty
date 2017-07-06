describe('options:balloon', function() {
  'use strict';

  afterEach(function() { Helper.clear(); });

  context('message text', function() {
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

          expect(message).toHaveHtml('Can\'t be blank or empty!');
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
              'data-validaty': 'maxselect:1',
              html:            Helper.option({ selected: true, html: '{index}', times: 2 }),
              multiple:        true
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
              'data-validaty': 'minselect:1',
              html:            Helper.option(),
              multiple:        true
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
              'data-validaty': 'rangeselect:1:2',
              html:            Helper.option(),
              multiple:        true
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
      it ('keeps visible', function(done) {
        // given
        var
          self      = $('form').validaty({ speed: 0 }),
          balloons1 = undefined,
          balloons2 = undefined;

        self.submit();

        balloons1 = self.first().children('.validaty-balloon');
        balloons2 = self.last().children('.validaty-balloon');

        setTimeout(function() {
          // when
          balloons2.first().mouseover();

          setTimeout(function() {
            // then
            expect(balloons1.css('opacity')).toEqual('1');

            done();
          }, 450);
        }, 450);
      });
    });
  });

  describe('hash', function() {
    beforeEach(function() {
      Helper.append(Helper.form({ html: Helper.text({ 'data-validaty': 'required' }) }));
    });

    it ('receives the field hash as ID', function() {
      // given
      var
        self = $('form').validaty(),
        hash = self.children('input')[0].hash;

      // when
      self.submit();

      // then
      expect(self.children('.validaty-balloon').attr('id')).toEqual(hash);
    });
  });

  describe('message markup', function() {
    context('enabled', function() {
      context('without checkboxes or radios', function() {
        beforeEach(function() {
          Helper.append(Helper.form({ html: Helper.text({ 'data-validaty': 'required' }) }));
        });

        it ('shows up as simples div after the field', function() {
          // given
          var
            self  = $('form').validaty(),
            input = self.children('input');

          // when
          self.submit();

          // then
          expect(input.next()).toHaveClass('validaty-balloon');
        });
      });

      context('with more than one checkbox', function() {
        beforeEach(function() {
          Helper.append(Helper.form({ html: Helper.checkbox({ 'data-validaty': 'required', times: 2 }) }));
        });

        it ('shows up after the first one', function() {
          // given
          var
            self  = $('form').validaty(),
            input = self.children('input:first');

          // when
          self.submit();

          // then
          expect(input.next()).toHaveClass('validaty-balloon');
        });
      });

      context('with more than one radio', function() {
        beforeEach(function() {
          Helper.append(Helper.form({ html: Helper.radio({ 'data-validaty': 'required', times: 2 }) }));
        });

        it ('shows up after the first one', function() {
          // given
          var
            self  = $('form').validaty(),
            input = self.children('input:first');

          // when
          self.submit();

          // then
          expect(input.next()).toHaveClass('validaty-balloon');
        });
      });
    });

    context('disabled', function() {
      context('without checkboxes or radios', function() {
        beforeEach(function() {
          Helper.append(Helper.form({ html: Helper.text({ 'data-validaty': 'required' }) }));
        });

        it ('shows up as simples list after the field', function() {
          // given
          var
            self  = $('form').validaty({ balloon: false }),
            input = self.children('input');

          // when
          self.submit();

          // then
          expect(input.next()).toHaveClass('validaty-message');
        });
      });

      context('with more than one checkbox', function() {
        beforeEach(function() {
          Helper.append(Helper.form({ html: Helper.checkbox({ 'data-validaty': 'required', times: 2 }) }));
        });

        it ('shows up after the last one', function() {
          // given
          var
            self  = $('form').validaty({ balloon: false }),
            input = self.children('input:last');

          // when
          self.submit();

          // then
          expect(input.next()).toHaveClass('validaty-message');
        });
      });

      context('with more than one radio', function() {
        beforeEach(function() {
          Helper.append(Helper.form({ html: Helper.radio({ 'data-validaty': 'required', times: 2 }) }));
        });

        it ('shows up after the last one', function() {
          // given
          var
            self  = $('form').validaty({ balloon: false }),
            input = self.children('input:last');

          // when
          self.submit();

          // then
          expect(input.next()).toHaveClass('validaty-message');
        });
      });
    });
  });
});
