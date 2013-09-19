var global = (typeof window !== 'undefined') ? window : {},
    Ember = global.Ember;

var ClientEvents = Ember.Mixin.create({

  needs: 'pusher',

  // Fire an event programmatically. All Events must unfortunately use
  // the client-<eventname> format for client events (a pusher restriction).
  pusherTrigger: function(channelName, eventName, data) {
    var channel = this.get('controllers.pusher').channelFor(channelName);
    channel.trigger(eventName, data);
  }

});

export { ClientEvents };
