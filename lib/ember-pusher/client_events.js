var global = (typeof window !== 'undefined') ? window : {},
    Ember = global.Ember;

var ClientEvents = Ember.Mixin.create({

  // Fire an event programmatically. All Events must unfortunately use
  // the client-<eventname> format for client events (a pusher restriction).
  pusherTrigger: function(channelName, eventName, data) {
    var channel = this.pusher.channelFor(channelName);
    channel.trigger(eventName, data);
  }

});

export { ClientEvents };
