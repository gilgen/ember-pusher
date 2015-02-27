# Ember Pusher [![Build Status](https://travis-ci.org/jamiebikies/ember-pusher.png?branch=master)](https://travis-ci.org/jamiebikies/ember-pusher)

A library for declaratively managing connections to Pusher channels and events
in your Ember application.

You are able to connect to different channels and events declaratively as the
user traverses through your application. The interface to event handlers
are natural methods on your controllers. In fact: The full event bubbling
framework is available to the pusher initiated events.


### Download
- [ember-pusher.js](https://ember-pusher-builds.s3.amazonaws.com/ember-pusher.js)
- [ember-pusher.min.js](https://ember-pusher-builds.s3.amazonaws.com/ember-pusher.min.js)
- [ember-pusher.amd.js](https://ember-pusher-builds.s3.amazonaws.com/ember-pusher.amd.js)


### Is it good?
Yes

### Is it production ready?
I guess? Ship it! :shipit:


### How do I use this thing?
Good question!

First things first: Stick your pusher connection options on your Application
object. Anything you pass into the `connection` hash will be passed in as
options to the pusher connection. This is a good place for auth params, and
things like that. You can get a list of all the options from
[Pusher's API](http://pusher.com/docs/client_api_guide/client_connect#connecting).


```javascript
App = Ember.Application.create({
  PUSHER_OPTS: { key: 'foo', connection: {} }
});
```

Next, for any controllers that you want to catch pusher events on:

1. Extend `EmberPusher.Bindings`.
2. Define `PUSHER_SUBSCRIPTIONS` where the keys are channel names and the
   values are arrays of events for the channel. If you have dynamic channel
   names or events, you can totally just construct your `PUSHER_SUBSCRIPTIONS`
   hash in `init()` of your controller (note: be sure to call ```this._super()``` afterwards). Private channels are fine.
3. Implement your event handlers on the controller.


##### Logging
There are two ways to setup logging. The first is to log all events which
can be accomplished by setting `logAllEvents` in your `PUSHER_OPTS` hash:


```javascript
App = Ember.Application.create({
  PUSHER_OPTS: { key: 'foo', connection: { ... }, logAllEvents: true }
});
```

The second method of logging, is to set `logPusherEvents` on the controllers
that you're binding. For example:

```javascript
var YourController = Em.Controller.extend(EmberPusher.Bindings, {
  logPusherEvents: true,
  PUSHER_SUBSCRIPTIONS: {
    myChannel: ['my-event']
  }
});
```

Note: Things work as expected if you set either of these options at runtime

##### Example Controller:

```javascript
var YourController = Em.Controller.extend(EmberPusher.Bindings, {
  PUSHER_SUBSCRIPTIONS: {
    craycray: ['event-one', 'event-two'],
    anotherone: ['event-three']
  },
  actions: {
    eventOne: function(){ console.log("eventOne is working!"); },
    eventTwo: function(){ console.log("eventTwo is working!"); },
    eventThree: function(){ console.log("eventThree is working!"); }
  }
});
```

**Note**: The event names have `camelize()` called on them, so that you can
keep your controller's methods looking consistent. Event handlers are tracked
and torn down when a controller is destroyed.

### Channels with Dashes

In some cases, Pusher requires a channel name that includes a dash – for example in `presence-`
or `private-` channels. Due to ember-cli being very strict with JavaScript syntax, it is not
possible to use a dash in the channel names when configuring your `PUSHER_SUBSCRIPTIONS`.

To get around this, we allow the `PUSHER_OPTS` option of `dasherizeChannel`. When set to true,
the channel name in `PUSHER_SUBSCRIPTIONS` is dasherized. For instance, this is how you would build
a simple presence controller.

```javascript
PUSHER_OPTS: { key: 'foo', dasherizeChannel: true }

...
var YourController = Em.Controller.extend(EmberPusher.Bindings, {
  PUSHER_SUBSCRIPTIONS: {
    presenceMessages: ['member_added'],
  },
});
```



That's about it! When events come in, they should be triggered on the listening controllers.
It should be noted that event bubbling will all work as expected, so you can actually implement
your handlers wherever suits your needs best.


Have fun! Certainly let me know if you see any bugs.

### Client Events

In order to send events from the client you will need to [enable client events](http://pusher.com/docs/client_api_guide/client_events#trigger-events)
for your Pusher application. In your Ember controllers you must mixin
`EmberPusher.ClientEvents` and call the `pusherTrigger` method.

##### Example Controller:

```javascript
var YourController = Em.Controller.extend(EmberPusher.ClientEvents, {
  actions: {
    sendSomeEvent: function() {
      // Pusher requires that the event be prefixed with 'client-'
      var eventName = 'client-some-event';
      this.pusherTrigger(this.get('channelName'), eventName, this.get('data'));
    }
  }
});
```



### FAQ
![question](https://ember-pusher-builds.s3.amazonaws.com/question2.jpg) __My events aren't firing! :'(__

Are you sure you've got the right event name on your controller? Do
an `Em.String.camelize('foo-bar')` on your event name. That's what you should
have implemented on your controller. Did you make sure to extend
`EmberPusher.Bindings` on the controller(s) you want to catch events on?


![question](https://ember-pusher-builds.s3.amazonaws.com/question1.jpg) __Can I connect to a private channel!?__

Yes.


![question](https://ember-pusher-builds.s3.amazonaws.com/question4.jpg) __What versions of Ember are supported!?__

~>1.0.0


![question](https://ember-pusher-builds.s3.amazonaws.com/question3.jpg) __Can I bind to channel connection events!?__

Indeed.

```javascript
App.MyController = Ember.Controller.extend(EmberPusher.Bindings, {
  PUSHER_SUBSCRIPTIONS: {
    myChannel: ['pusher:subscription_succeeded']
  },

  actions: {
    'pusher:subscriptionSucceeded': function() {
      console.log("Connected!");
    }
  }
});
```

![question](https://ember-pusher-builds.s3.amazonaws.com/question5.jpg) __What can I bind to for the connection status and socket id!?__

You could bind to `isConnected` and `socketId` which are both on the pusherController.

```javascript
App.MyController = Ember.Controller.extend(EmberPusher.Bindings, {
  socketIdChanged: function() {
    console.log("Socket ID changed", this.pusher.get('socketId'));
  }.observes('pusher.socketId').on('init'),

  pusherConnectionStatusChanged: function() {
    console.log("Connection status changed", this.pusher.get('isConnected'));
  }.observes('pusher.isConnected').on('init')
});
```



### Running the tests
`grunt test` - Runs Mocha tests through PhantomJS

`grunt server` - Run tests through a browser. Visit `http://localhost:8000/test`.


### Building
`grunt build` - build 'er

### Contributors
[@wycats](https://github.com/wycats) - Architectural advice.
