import Ember from 'ember';

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

export default Ember.Service.extend({
  isDisconnected: true,
  isConnected: Ember.computed.not('isDisconnected'),

  init() {
    this.pusher = null;
    this.set('bindings', {});
    this.logEvents = false;
  },

  setup(applicationKey, options) {
    Ember.assert("ember-pusher can only be setup once", !this.pusher);
    Ember.assert("You need to include the pusher libraries", !!window.Pusher);

    this.pusher = new window.Pusher(applicationKey, options);
    this.pusher.connection.bind('connected', this._didConnect.bind(this));
    this.pusher.connection.bind('disconnected', this._didDisconnect.bind(this));
    this.pusher.connection.bind('unavailable', this._didDisconnect.bind(this));
  },

  willDestroy() {
    if (this.pusher) {
      this.pusher.disconnect();
    }
  },

  // @events a hash in the form { channel-name: ['event1', 'event2'] }
  // @target any object that responds to send() and _pusherEventsId()
  wire(target, channelName, events) {
    Ember.assert("Did you forget to extend the EmberPusher.Bindings mixin in " +
        "your class receiving events?", !!target._pusherEventsId);

    let channel = this.connectChannel(channelName),
        bindings = this.get('bindings'),
        targetId = target._pusherEventsId();

    // Setup the eventBindings array for this target
    if (!bindings[channelName].eventBindings[targetId]) {
      bindings[channelName].eventBindings[targetId] = [];
    }

    // Iterate over the events and bind them
    events.forEach(eventName => {
      let normalizedEventName = Ember.String.camelize(eventName);
      let events = bindings[channelName].eventBindings[targetId];
      let found;
      let handler = function(data) {
        if (target.get('logPusherEvents')) {
          console.log(target.constructor.toString() +
            ": Pusher event received", eventName, data);
        }
        Ember.run(() => {
          target.send(normalizedEventName, data);
        });
      };

      channel.bind(eventName, handler);

      if(found = events.findBy('eventName', eventName)) {
        found.handler = handler;
      }
      else {
        events.pushObject({
          handler: handler,
          eventName: eventName,
          target: target
        });
      }
    });
  },

  connectChannel(channelName) {
    let pusher = this.pusher,
        bindings = this.get('bindings');

    if (!bindings[channelName]) {
      bindings[channelName] = { eventBindings: {} };
    }

    if (Ember.isEmpty(Object.keys(bindings[channelName].eventBindings))) {
      bindings[channelName].channel = pusher.subscribe(channelName);

      // Spit out a bunch of logging if asked
      if (this.namespace && this.logEvents) {
        bindings[channelName].channel.bind_all((eventName, data) => {
          console.log(
            "Pusher event received on " + channelName + ":",
            eventName,
            data
          );
        });
      }
    }
    return bindings[channelName].channel;
  },

  unwire(target, channelName) {
    let pusher = this.pusher,
        bindings = this.get('bindings'),
        targetId = target._pusherEventsId(),
        channel = bindings[channelName].channel;

    // Unbind all the events for this target
    for (let binding in bindings[channelName].eventBindings[targetId]) {
      channel.unbind(binding.eventName, binding.handler);
    }
    delete bindings[channelName].eventBindings[targetId];

    // Unsubscribe from the channel if this is the last thing listening
    if (Object.keys(bindings[channelName].eventBindings).length === 0) {
      pusher.unsubscribe(channelName);
      delete bindings[channelName];
      return true;
    }
    return false;
  },

  channelFor(channelName) {
    return this.get('bindings')[channelName].channel;
  },

  socketId: Ember.computed('isDisconnected', function() {
    try {
      return this.pusher.connection.socket_id;
    }
    catch(error) {
      console.warn(error);
    }
  }),

  _didConnect() {
    this.set('isDisconnected', false);
  },

  _didDisconnect() {
    this.set('isDisconnected', true);
  }
});
