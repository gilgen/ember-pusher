# Ember Pusher

A library for declaratively managing connections to Pusher channels and events
in your Ember application.

You are able to connect to different channels and events declaratively as the
user traverses through your application. The interface to event handlers
are natural methods on your controllers. In fact: The full event bubbling
framework is available to the pusher initiated events.


### Install
In your ember app, run:  
`npm install --save-dev ember-pusher`

Because ember pusher uses the Pusher library which doesn't have a bower module
we need to use browserify to bring it into the addon. Unfortunately this means
that in your app you will need to do the following. That's it.

`npm install --save-dev ember-browserify` (check to make sure you don't already have this in your `package.json`)  
`npm install --save-dev pusher-js@3.1.0` (make sure you don't have `pusher` being pulled in in your bower.json)


### Is it good?
Yes

### How do I use this thing?
Good question! This is just one example, but the idea below, is that you
will at some point in your application initialization call the pusher
service's `setup(args)` method. This method takes in the pusher key and
a hash of options which get sent to the pusher connect method.  
  
If you're interested in the kinds of things you can pass in...
[Pusher's API](http://pusher.com/docs/client_api_guide/client_connect#connecting)  

```javascript
// app/pods/application/route.js
setupController(controller, model) {

  let csrfToken = 'your-csrf-token',
      pusherKey = 'your-pusher-key';
  
  // pusher (the service) is injected into routes and controllers
  this.get('pusher').setup(pusherKey, {
    auth: {
      params: {
        authenticity_token: csrfToken
      }
    }
  });
  
},
```

Next, for any controllers that you want to catch pusher events on:

1. Extend `EmberPusher.Bindings`.
2. Define `PUSHER_SUBSCRIPTIONS` where the keys are channel names and the
   values are arrays of events for the channel. If you have dynamic channel
   names or events, you can totally just construct your `PUSHER_SUBSCRIPTIONS`
   hash in `init()` of your controller (note: be sure to call ```this._super()``` afterwards). Private channels are fine. As a very dynamic alternative, you can use `wire()` and `unwire()` on the pusher service manually as described below.
3. Implement your event handlers on the controller according to the conventions.


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

##### Example if the channel name is dynamic.
```javascript
import Ember from 'ember';
import EmberPusher from 'ember-pusher';

export default Ember.Component.extend(EmberPusher.Bindings, {

  pusher: Ember.inject.service(),
  pusherEvents: ['event-one', 'event-two'],

  didInsertElement() {
    let pusher = this.get('pusher');
    
    // Signature for wire is wire(target, channelName, events)
    pusher.wire(this, this.get('channelName'), this.get('pusherEvents'));
  }),
  
  // Clean up when we leave. We probably don't want to still be receiving
  // events. This is all done automatically if wiring events via PUSHER_SUBSCRIPTIONS.
  willDestroyElement() {
    this.get('pusher').unwire(this, this.get('channelName'));
  },
  
  actions: {
    eventOne() {
      console.log('event one!');
    },
    
    eventTwo() {
      console.log('event two!');
    }
  }
  
}
```

**Note**: The event names have `camelize()` called on them, so that you can
keep your controller's methods looking consistent. Event handlers are tracked
and torn down when a controller is destroyed.


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

`PUSHER_SUBSCRIPTIONS: { 'private-user.3' : ['cuckoo'] }`


![question](https://ember-pusher-builds.s3.amazonaws.com/question4.jpg) __What versions of Ember are supported!?__

~>1.0.0


![question](https://ember-pusher-builds.s3.amazonaws.com/question3.jpg) __Can I bind to channel connection events!?__

Indeed.

```javascript
App.MyController = Ember.Controller.extend(EmberPusher.Bindings, {
  PUSHER_SUBSCRIPTIONS: {
    my-channel: ['pusher:subscription_succeeded']
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
