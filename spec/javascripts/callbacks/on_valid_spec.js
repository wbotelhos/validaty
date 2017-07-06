describe('callbacks#onValid', function() {
  'use strict';

  afterEach(function() { Helper.clear(); });

  context('when all field is valid', function() {
    beforeEach(function() {
      this.input = Helper.input({ type: 'type', 'data-input': true, 'data-validaty': 'number' });

      Helper.append(Helper.form({ html: this.input, 'data-form': true, onsubmit: 'return false;' }));
    });

    it ('is executed', function() {
      // given
      var self = $('form').validaty({
        onValid: function(inputs, evt) {
          $(this).data({ this: this, inputs: inputs, evt: evt });
        }
      });

      // when
      self.submit();

      // then

      var inputs = self.data('inputs');

      expect(inputs.length).toEqual(1);

      expect(inputs[0].getAttribute('data-input')).toBeTruthy();
      expect($(self).data('this').getAttribute('data-form')).toBeTruthy('s');
      expect($(self).data('evt').type).toEqual('submit');
    });
  });

  context('when some field is invalid', function() {
    beforeEach(function() {
      this.input = Helper.input({ type: 'type', 'data-validaty': 'number', value: 'text' });

      Helper.append(Helper.form({ html: this.input, onsubmit: 'return false;' }));
    });

    it ('is not executed', function() {
      // given
      var self = $('form').validaty({
        onValid: function(inputs) {
          $(this).data({ inputs: inputs });
        }
      });

      // when
      self.submit();

      // then

      expect(self.data('inputs')).toBeUndefined();
      expect($(self).data('this')).toBeUndefined();
      expect($(self).data('evt')).toBeUndefined();
    });
  });
});
