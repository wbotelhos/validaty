describe('markup:fields', function() {
  'use strict';

  afterEach(function() { Helper.clear(); });

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
          var
            self   = $('form').validaty(),
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
          html:     Helper.checkbox({ name: 'name', 'data-validaty': 'required', times: 2 })
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
          var
            self   = $('form').validaty(),
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
          html:     Helper.radio({ name: 'name', 'data-validaty': 'required', times: 2 })
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
          var
            self   = $('form').validaty(),
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
      var
        self  = $('form').validaty(),
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
