var global = (typeof window !== 'undefined') ? window : {},
    Ember = global.Ember;

// Need to track
// 1) channel object
// 2) event bindings which consist of
//    - handler
//    - event name
//    - a unique string representing the target
//
//  bindings: {
//    'channel-one': {
//      channel: Pusher.Channel,
//      eventBindings: {
//        Ember.Route.toString(): [
//          { handler: Function, eventName: String },
//          { handler: Function, eventName: String }
//        ]
//      }
//    }
//  }
//
//  wire(target, channelName, events)
//  ================
//  Initialize object in bindings if it's empty, with eventBindings: {}
//  If eventBindings.length for the current target is 0
//    connect to the channel
//    store channel in the hash
//  For each event in events
//    bind the channel to the eventName
//    store the handler and eventName in the eventBindings array for this channel and controller
//    the key for storing is in target._pusherTargetId()
//    (we store the eventName for when we might want to programmatically unwire)
//
//
//  unwire(route):
//  =================
//  get the channel object
//  for each  handler, eventName in eventBindings for the current route
//    call channel.unbind(eventName, handler)
//  delete the routes record in EventBindings
//  if eventBindings for this channel is empty
//    unsubscribe from the channel
//    delete the channel from bindings

var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

var Controller = Ember.Controller.extend({

  LOG_ALL_EVENTS: false,
  connection: null,
  isDisconnected: false,
  isConnected: Ember.computed.not('isDisconnected'),

  init: function() {
    this._super();
    this.set('bindings', {});
  },

  // Called by the application initializer
  didCreatePusher: function(pusher) {
    this.set('connection', pusher);
    pusher.connection.bind('connected',     __bind(this._didConnect,    this));
    pusher.connection.bind('disconnected',  __bind(this._didDisconnect, this));
    pusher.connection.bind('unavailable',   __bind(this._didDisconnect, this));
  },

  // @events a hash in the form { channel-name: ['event1', 'event2'] }
  // @target any object that responds to send() and _pusherEventsId()
  wire: function(target, channelName, events) {
    var channel = this.connectChannel(channelName),
        bindings = this.get('bindings'),
        targetId = target._pusherEventsId();

    // Setup the eventBindings array for this target
    if(!bindings[channelName].eventBindings[targetId])
      bindings[channelName].eventBindings[targetId] = [];

    // Iterate over the events and bind them
    events.forEach(function(eventName) {
      var normalizedEventName = Ember.String.camelize(eventName),
          handler;
      handler = function(data) {
        target.send(Ember.String.camelize(eventName), data);
      };
      channel.bind(eventName, handler);
      bindings[channelName].eventBindings[targetId].pushObject({
        handler: handler,
        eventName: eventName
      });
    });
  },

  connectChannel: function(channelName) {
    var pusher = this.get('connection'),
        bindings = this.get('bindings');
    if(!bindings[channelName]) {
      bindings[channelName] = { eventBindings: {} };
    }
    if(Ember.isEmpty(Object.keys(bindings[channelName].eventBindings))) {
      bindings[channelName].channel = pusher.subscribe(channelName);

      // Spit out a bunch of logging if asked
      if(this.LOG_ALL_EVENTS) {
        bindings[channelName].channel.bind_all(function(eventName, data) {
          console.log("Pusher event received", eventName, data);
        });
      }
    }
    return bindings[channelName].channel;
  },

  unwire: function(target, channelName) {
    var pusher = this.get('connection'),
        bindings = this.get('bindings'),
        targetId = target._pusherEventsId(),
        channel = bindings[channelName].channel;

    // Unbind all the events for this target
    for(var binding in bindings[channelName].eventBindings[targetId]) {
      channel.unbind(binding.eventName, binding.handler);
    }
    delete bindings[channelName].eventBindings[targetId];

    // Unsubscribe from the channel if this is the last thing listening
    if(bindings[channelName].eventBindings.length === 0) {
      pusher.unsubscribe(channelName);
      delete bindings[channelName];
      return true;
    }
    return false;
  },

  channelFor: function(channelName) {
    return this.get('bindings')[channelName].channel;
  },

  socketId: function() {
    try {
      return this.get('connection').connection.socket_id;
    }
    catch(error) {
      console.warn(error);
    }
  }.property('isDisconnected'),

  _didConnect: function() {
    this.set('isDisconnected', false);
  },

  _didDisconnect: function() {
    this.set('isDisconnected', true);
  }

});

export { Controller };
