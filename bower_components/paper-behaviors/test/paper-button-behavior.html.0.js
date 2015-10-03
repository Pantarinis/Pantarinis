
    suite('basic', function() {
      var button;

      setup(function() {
        button = fixture('basic');
      });

      test('normal (no states)', function() {
        assert.equal(button._elevation, 1);
      });

      test('set disabled property', function() {
        button.disabled = true;
        assert.equal(button._elevation, 0);
      });

      test('pressed and released', function() {
        MockInteractions.down(button);
        assert.equal(button._elevation, 4);
        MockInteractions.up(button);
        assert.equal(button._elevation, 1);
      });

      suite('a button with toggles', function() {
        setup(function() {
          button.toggles = true;
        });

        test('activated by tap', function(done) {
          MockInteractions.downAndUp(button, function() {
            try {
              assert.equal(button._elevation, 4);
              done();
            } catch (e) {
              done(e);
            }
          });
        });
      });

      test('receives focused', function() {
        MockInteractions.focus(button);
        assert.equal(button._elevation, 3);
      });
    });
  