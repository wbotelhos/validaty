describe('validations#message', function() {
  'use strict';

  afterEach(function() { Helper.clear(); });

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
    expect(opt.validators.required.message.text).toEqual('Can\'t be blank or empty!');
    expect(opt.validators.required.message.textarea).toEqual('Can\'t be blank or empty!');
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
