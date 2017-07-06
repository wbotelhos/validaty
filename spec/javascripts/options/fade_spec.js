describe('options:fade', function() {
  'use strict';

  beforeEach(function() {
    Helper.append(Helper.form({ html: Helper.text({ 'data-validaty': 'required', times: 2 }) }));
  });

  afterEach(function() { Helper.clear(); });

  context('true', function() {
    context('mouseover', function() {
      context('with balloon true', function() {
        it ('keeps the overed and fades out the others', function(done) {
          // given
          var
            self     = $('form').validaty({ fade: true, balloon: true, speed: 0 }),
            balloons = undefined;

          self.submit();

          balloons = self.children('.validaty-balloon');

          setTimeout(function() {
            // when
            balloons.first().mouseover();

            setTimeout(function() {
              // then
              expect(balloons.first().css('opacity')).toEqual('1');
              expect(balloons.last().css('opacity')).toEqual('0.2');

              done();
            }, 450);
          }, 450);
        });
      });

      context('with balloon false', function() {
        it ('keeps the overed and fades out the others', function(done) {
          // given
          var
            self     = $('form').validaty({ fade: true, balloon: false, speed: 0 }),
            balloons = undefined;

          self.submit();

          balloons = self.children('.validaty-message');

          setTimeout(function() {
            // when
            balloons.first().mouseover();

            setTimeout(function() {
              // then
              expect(balloons.first().css('opacity')).toEqual('1');
              expect(balloons.last().css('opacity')).toEqual('0.2');

              done();
            }, 450);
          }, 450);
        });
      });
    });
  });

  context('false', function() {
    context('mouseover', function() {
      context('with balloon true', function() {
        it ('is not excuted', function(done) {
          // given
          var
            self     = $('form').validaty({ fade: false, balloon: true, speed: 0 }),
            balloons = undefined;

          self.submit();

          balloons = self.children('.validaty-balloon');

          setTimeout(function() {
            // when
            balloons.first().mouseover();

            setTimeout(function() {
              // then
              expect(balloons.first().css('opacity')).toEqual('1');
              expect(balloons.last().css('opacity')).toEqual('1');

              done();
            }, 450);
          }, 450);
        });
      });

      context('with balloon false', function() {
        it ('keeps the overed and fades out the others', function(done) {
          // given
          var
            self     = $('form').validaty({ fade: false, balloon: false, speed: 0 }),
            balloons = undefined;

          self.submit();

          balloons = self.children('.validaty-message');

          setTimeout(function() {
            // when
            balloons.first().mouseover();

            setTimeout(function() {
              // then
              expect(balloons.first().css('opacity')).toEqual('1');
              expect(balloons.last().css('opacity')).toEqual('1');

              done();
            }, 450);
          }, 450);
        });
      });
    });
  });
});
