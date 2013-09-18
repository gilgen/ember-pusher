Ember.PusherBindings = Em.Mixin.create({

  needs: 'pusher',

  init: function() {
    this._super()
    if(!this.PUSHER_SUBSCRIPTIONS) {
      return;
    }
    var pusherController = this.get('controllers.pusher'),
        target = this;
    Object.keys(target.PUSHER_SUBSCRIPTIONS).forEach(function (channelName) {
      var events = target.PUSHER_SUBSCRIPTIONS[channelName];
      pusherController.wire(target, channelName, events);
    });
  },

  deactivate: function() {
    if(!this.PUSHER_SUBSCRIPTIONS) { return; }
    var pusherController = this.controllerFor('pusher'),
        target = this;
    Object.keys(target.PUSHER_SUBSCRIPTIONS).forEach(function (channelName) {
      pusherController.unwire(target, channelName);
    })
  },

  _pusherEventsId: function() {
    return this.toString();
  }

});

