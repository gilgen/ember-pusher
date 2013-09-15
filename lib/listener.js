CM.PusherListener = Em.Mixin.create({

  needs: 'pusher',

  _pusherBindings: [],

  // Implement the handlers in the controller or somewhere
  // up the chain (ie. in the router)
  //
  // The event name coming in from pusher is going to be camelized
  // ie: users_added pusher event will bubble the usersAdded event
  pusherListenTo: function(channelName, eventName) {
    var channel = this.get('controllers.pusher').channelFor(channelName);

    // Create the handler and in the darkness, bind it
    if(channel) {
      var _this = this;
      var handler = function(data) {
        _this.send(Em.String.camelize(eventName), data);
      };

      channel.bind(eventName, handler);

      // Track this channel/event/handler
      this.get('_pusherBindings').pushObject({
        channelName: channelName,
        eventName: eventName,
        handler: handler
      });
    }
    else {
      console.warn("The channel '" + channelName + "' does not exist");
    }
  },

  // Unbind a specific event from being propagated
  pusherUnlistenTo: function(channelName, eventName) {

    // Locate the tracked binding and get a handle on the channel
    var binding = this.get('_pusherBindings').find(function(b) {
      return b.channelName === channelName && b.eventName === eventName;
    });
    var channel = this.get('controllers.pusher').channelFor(channelName);

    // Remove the binding and tracking objects
    if(binding && channel) {
      channel.unbind(binding.eventName, binding.handler);
      this.get('_pusherBindings').removeObject(binding);
    }
    else {
      console.warn("It doesn't look like have '" + eventName +
        "' bound to the '" + channelName + "' channel");
    }
  },

  // Hook into the object lifecycle to tear down any bindings
  willDestroy: function() {
    var _this = this;
    this.get('_pusherBindings').forEach(function(binding) {
      _this.pusherUnlistenTo(binding.channelName, binding.eventName);
    });
    this._super()
  }

});


