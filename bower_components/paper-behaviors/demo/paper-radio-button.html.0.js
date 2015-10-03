

    Polymer({

      behaviors: [
        Polymer.PaperInkyFocusBehavior
      ],

      hostAttributes: {
        role: 'radio'
      },

      ready: function() {
        this.toggles = true;
      }

    });

  