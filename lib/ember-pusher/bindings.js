var global = (typeof window !== 'undefined') ? window : {},
    Ember = global.Ember;

var Bindings = Ember.Mixin.create({

  init: function() {
    var target;
    this._super();
    if(!this.PUSHER_SUBSCRIPTIONS) { return; }
    target = this;
    Object.keys(target.PUSHER_SUBSCRIPTIONS).forEach(function (channelName) {
      var events = target.PUSHER_SUBSCRIPTIONS[channelName];
      if(target.pusher.get("dasherizeChannel")) {
        channelName = channelName.dasherize();
      }
      target.pusher.wire(target, channelName, events);
    });
  },

  willDestroy: function() {
    var target;
    if(!this.PUSHER_SUBSCRIPTIONS) { return; }
    target = this;
    Object.keys(target.PUSHER_SUBSCRIPTIONS).forEach(function (channelName) {
      target.pusher.unwire(target, channelName);
    });
    this._super();
  },

  _pusherEventsId: function() {
    return this.toString();
  }

});

export { Bindings };
