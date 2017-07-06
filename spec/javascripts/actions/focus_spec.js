context('actions:focus', function() {
  afterEach(function() { Helper.clear(); });

  context('with one field inside the same form', function() {
    beforeEach(function() {
      Helper.append(Helper.form({
        html: Helper.text({ 'data-validaty': 'required on:focus' })
      }));
    });

    it ('triggers the validation and does not trigger a infinite looping', function() {
      // given
      var
        self  = $('form').validaty(),
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
        var
          self  = $('form').validaty(),
          first = self.children('input:first');

        // when
        first.focus();

        // then
        expect(self.children('.validaty-balloon')).not.toExist();
      });

      it ('does not removes the validation of the other', function() {
        // given
        var
          self  = $('form').validaty(),
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
