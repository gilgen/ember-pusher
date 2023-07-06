// https://github.com/pusher-community/pusher-js-test-stub
var PusherTestStub =
/******/ (function(modules) { // webpackBootstrap
/******/  // The module cache
/******/  var installedModules = {};

/******/  // The require function
/******/  function __webpack_require__(moduleId) {

/******/    // Check if module is in cache
/******/    if(installedModules[moduleId])
/******/      return installedModules[moduleId].exports;

/******/    // Create a new module (and put it into the cache)
/******/    var module = installedModules[moduleId] = {
/******/      exports: {},
/******/      id: moduleId,
/******/      loaded: false
/******/    };

/******/    // Execute the module function
/******/    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/    // Flag the module as loaded
/******/    module.loaded = true;

/******/    // Return the exports of the module
/******/    return module.exports;
/******/  }


/******/  // expose the modules object (__webpack_modules__)
/******/  __webpack_require__.m = modules;

/******/  // expose the module cache
/******/  __webpack_require__.c = installedModules;

/******/  // __webpack_public_path__
/******/  __webpack_require__.p = "";

/******/  // Load entry module and return exports
/******/  return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  var deps = __webpack_require__(1);
  var Connection = __webpack_require__(2);
  var Channel = __webpack_require__(3);
  var PrivateChannel = __webpack_require__(4);
  var PresenceChannel = __webpack_require__(5);

  /**
   * Create a new instance of the test stub.
   *
   * @param {String} key the Pusher application key
   * @param {Object} options additional config options
   */
  function PusherTestStub(key, options) {
    this.key = key;
    this.connection = new Connection();
    
    this._channels = {};
    
    PusherTestStub.singleton = this;
    PusherTestStub.instances.push(this);
  }
  deps.Util.extend(PusherTestStub.prototype, deps.EventDispatcher.prototype);

  PusherTestStub.IS_STUB = true;
  PusherTestStub.singleton = null;
  PusherTestStub.instances = [];
  PusherTestStub.Util = deps.Util;

  PusherTestStub.prototype.subscribe = function(channelName, options) {
    var channel = this._channels[ channelName ];
    
    if(channel === undefined) {
      channel = this._channelFactory(channelName, options);
      this._channels[ channelName ] = channel;
    }
    
    return channel;
  };

  /** @private **/
  PusherTestStub.ready = function() {};

  /** @private **/
  PusherTestStub.prototype._channelFactory = function(channelName, options) {
    var channel = null;

    if(channelName.indexOf('private-') == 0) {
      channel = new PrivateChannel(name);
    }
    else if(channelName.indexOf('presence-') === 0) {
      channel = new PresenceChannel(channelName);
    }
    else {
      channel = new Channel(channelName);
    }
    
    return channel;
  };

  PusherTestStub.prototype.unsubscribe = function(channelName) {
    delete this._channels[channelName];
  };

  PusherTestStub.prototype.channel = function(channelName) {
    return this._channels[channelName]
  };

  PusherTestStub.prototype.allChannels = function() {
    var channels = [];
    for(var name in this._channels) {
      channels.push(name);
    }
    return channels;
  };

  PusherTestStub.prototype.connect = function() {
    
  };

  PusherTestStub.prototype.disconnect = function() {
    
  };

  /**
   * Helper function for triggering events on channels.
   *
   * @param {String} channelName the name of the channel to trigger an event on
   * @param {String} eventName the event to be triggered on the channel
   * @param {Object} eventData the event data payload to be associated with the event
   */
  PusherTestStub.prototype.trigger = function(channelName, eventName, eventData) {
    this.channel(channelName).emit(eventName, eventData);
  };

  window.Pusher = PusherTestStub;

  module.exports = PusherTestStub;


/***/ },
/* 1 */
/***/ function(module, exports) {

  var PusherDefinition = window.Pusher;

  module.exports = {
    Pusher: PusherDefinition,
    EventDispatcher: PusherDefinition.EventsDispatcher,
    Util: PusherDefinition.Util,
    Members: PusherDefinition.Members
  };


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

  var deps = __webpack_require__(1);

  function Connection() {
    deps.EventDispatcher.call(this, function(event, data) {
        console.log('No callbacks on connection for ' + event);
    });
    
    this.state = 'disconnected';
  }
  deps.Util.extend(Connection.prototype, deps.EventDispatcher.prototype);

  module.exports = Connection;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

  var deps = __webpack_require__(1);

  function Channel(name) {
    deps.EventDispatcher.call(this, function(event, data) {
        console.log('No callbacks on ' + name + ' for ' + event);
    });
    
    this.name = name;
    this.subscribed = false;
  }
  deps.Util.extend(Channel.prototype, deps.EventDispatcher.prototype);

  module.exports = Channel;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

  var deps = __webpack_require__(1);
  var Channel = __webpack_require__(3);

  function PrivateChannel(name) {
    Channel.call(this, name);
  }
  deps.Util.extend(PrivateChannel.prototype, Channel.prototype);

  PrivateChannel.prototype.trigger = function(eventName, eventData) {
    
  };

  module.exports = PrivateChannel;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

  var deps = __webpack_require__(1);
  var PrivateChannel = __webpack_require__(4);

  function PresenceChannel(name) {
    PrivateChannel.call(this, name);
    
    this.members = new deps.Members();
  }
  deps.Util.extend(PresenceChannel.prototype, PrivateChannel.prototype);

  module.exports = PresenceChannel;


/***/ }
/******/ ]);