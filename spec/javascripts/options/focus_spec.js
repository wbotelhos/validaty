describe('options:focus', function() {
  'user strict';

  afterEach(function() { Helper.clear(); });

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
