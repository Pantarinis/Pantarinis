
    suite('basic', function() {
      var button;
      var ink;

      setup(function() {
        button = fixture('basic');
        ink = button.querySelector('paper-ripple');
        MockInteractions.blur(button);
      });

      test('normal (no states)', function() {
        assert.isFalse(button.focused);
        assert.isFalse(ink._animating);
        assert.equal(ink.ripples.length, 0);
      });

      test('receives focus', function() {
        MockInteractions.focus(button);

        assert.isTrue(button.focused);
        assert.isTrue(ink._animating);
        assert.equal(ink.ripples.length, 1);
      });

    });
  