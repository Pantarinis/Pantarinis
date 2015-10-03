

      suite('item a11y tests', function() {
        var item, iconItem;

        setup(function() {
          item = fixture('item');
          iconItem = fixture('iconItem');
        });

        test('item has role="listitem"', function() {
          assert.equal(item.getAttribute('role'), 'listitem', 'has role="item"');
        });

        test('icon item has role="listitem"', function() {
          assert.equal(iconItem.getAttribute('role'), 'listitem', 'has role="item"');
        });
      });

    