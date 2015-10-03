
    function FakeMouseEvent (target, relativeX, relativeX) {
      var rect = target.getBoundingClientRect();

      return {
        detail: {
          x: rect.left + relativeX,
          y: rect.top + relativeX
        }
      };
    }

    suite('<paper-ripple>', function () {
      var mouseEvent;
      var rippleContainer;
      var ripple;

      suite('when tapped', function () {
        setup(function () {
          rippleContainer = fixture('TrivialRipple');
          ripple = rippleContainer.firstElementChild;

          mouseEvent = new FakeMouseEvent(ripple, 10, 10);
        });

        test('creates a ripple', function () {
          expect(ripple.ripples.length).to.be.eql(0);
          ripple.downAction(mouseEvent);
          expect(ripple.ripples.length).to.be.eql(1);
        });

        test('may create multiple ripples that overlap', function () {
          expect(ripple.ripples.length).to.be.eql(0);

          for (var i = 0; i < 3; ++i) {
            ripple.downAction(mouseEvent);
            expect(ripple.ripples.length).to.be.eql(i + 1);
          }
        });
      });

      suite('with the `center` attribute set to true', function () {
        setup(function () {
          rippleContainer = fixture('CenteringRipple');
          ripple = rippleContainer.firstElementChild;

          mouseEvent = new FakeMouseEvent(ripple, 10, 10);
        });

        test('ripples will center', function (done) {
          var waveContainerElement;
          // let's ask the browser what `translate3d(0px, 0px, 0)` will actually look like
          var div = document.createElement('div');
          div.style.webkitTransform = 'translate3d(0px, 0px, 0px)';
          div.style.transform = 'translate3d(0px, 0px, 0)';

          ripple.downAction(mouseEvent);

          waveContainerElement = ripple.ripples[0].waveContainer;

          ripple.upAction(mouseEvent);

          window.requestAnimationFrame(function () {
            var currentTransform = waveContainerElement.style.transform;
            try {
              expect(div.style.transform).to.be.ok;
              expect(currentTransform).to.be.ok;
              expect(currentTransform).to.be.eql(div.style.transform);

              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });

      suite('with the `recenters` attribute set to true', function () {
        setup(function () {
          rippleContainer = fixture('RecenteringRipple');
          ripple = rippleContainer.firstElementChild;
          mouseEvent = new FakeMouseEvent(ripple, 10, 10);
        });
        test('ripples will gravitate towards the center', function (done) {
          var waveContainerElement;
          var waveTranslateString;
          ripple.downAction(mouseEvent);
          waveContainerElement = ripple.ripples[0].waveContainer;
          waveTranslateString = waveContainerElement.style.transform;
          ripple.upAction(mouseEvent);
          window.requestAnimationFrame(function () {
            try {
              expect(waveTranslateString).to.be.ok;
              expect(waveContainerElement.style.transform).to.be.ok;
              expect(waveContainerElement.style.transform).to.not.be.eql(waveTranslateString);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });

    });
  