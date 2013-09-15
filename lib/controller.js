var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

// var set = {};
//
// // always
// set[channelName] = set[channelName] || 0;
//
// // increment
// set[channelName]++;
//
// // decrement
// set[channelName]--;
//
// // check
// set[channelName];

EP.PusherController = Em.Controller.extend({

  LOG_ALL_EVENTS: true,
  connection: null,
  isDisconnected: false,
  connectingIn: 0,

  init: function() {
    this._super()
    this.set('channelBindings', {});
    this.set('channels', {});
  },

  didCreatePusher: function(pusher) {
    this.set('connection', pusher);

    pusher.connection.bind('connected',     __bind(this._didConnect,    this));
    pusher.connection.bind('disconnected',  __bind(this._didDisconnect, this));
    pusher.connection.bind('unavailable',   __bind(this._didDisconnect, this));
  },

  connectChannel: function(channel) {
    var bindings = this.get('channelBindings');
    bindings[channel] = bindings[channel] || 0;
    if(bindings[channel] === 0) {
      this.connect(channel);
    }
    bindings[channel]++;
  },

  disconnectChannel: function(channel) {
    var bindings = this.get('channelBindings');
    bindings[channel]--;

    if(bindings[channel] === 0) {
      this.disconnect(channel);
    }
  },

  connectEvents: function(events) {

  },

  connect: function(name) {
    var pusher = this.get('connection'),
        channel = pusher.subscribe(name);

    // Keep track of all of our channels
    this.get('channels')[name] = channel;

    // Spit out a bunch of logging if asked
    if(this.LOG_ALL_EVENTS) {
      channel.bind_all(function(eventName, data) {
        console.log("Pusher event received", eventName, data);
      });
    }
  },

  disconnect: function(name) {
    var pusher = this.get('connection');
    pusher.unsubscribe(name);

    delete this.get('channels')[name];
  },

  socketId: function() {
    console.log("socketId");
    try {
      return this.get('connection').connection.socket_id;
    }
    catch(error) {
      console.warn(error);
    }
  }.property('isDisconnected'),

  // Accessor method to get a handle on a pusher channel given
  // the channel's name
  channelFor: function(name) {
    try {
      return this.get('channels')[name];
    }
    catch(error) {
      console.warn("Could not find a channel by the name of '" + name + "'");
    }
  },

  _didConnect: function() {
    this.set('isDisconnected', false);
  },

  _didDisconnect: function() {
    this.set('isDisconnected', true);
  }

});

