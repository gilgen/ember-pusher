Ember.PusherBindings = Em.Mixin.create({

  needs: 'pusher',

  init: function() {
    this._super()
    if(!this.PUSHER_SUBSCRIPTIONS) {
      console.warn("You mixed in PusherRoute but did not define PUSHER_SUBSCRIPTIONS");
      return;
    }
    var pusherController = this.get('controllers.pusher'),
        self = this;
    Object.keys(self.PUSHER_SUBSCRIPTIONS).forEach(function (channelName) {
      pusherController.wire(
        self,
        channelName,
        self.PUSHER_SUBSCRIPTIONS[channelName]
      );
    });
  },

  deactivate: function() {
    if(!this.PUSHER_SUBSCRIPTIONS) { return; }
    var pusherController = this.controllerFor('pusher'),
        self = this;
    Object.keys(self.PUSHER_SUBSCRIPTIONS).forEach(function (channelName) {
      pusherController.unwire(self, channelName);
    })
  },

  _pusherEventsId: function() {
    return this.toString();
  }

});

