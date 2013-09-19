# Ember Pusher

A library for declaratively managing connections to Pusher channels and events
in your Ember application.

You are able to connect to different channels and events declaratively as the
user traverses through your application. The interface to event handlers
are natural methods on your controllers. In fact: The full event bubbling
framework is available to the pusher initiated events.

## Is it good?

Yes


## Is it production ready?

No


## Running the tests
`grunt test` - Runs Mocha tests through Node and PhantomJS

`grunt test:phantom` - Run Mocha tests through PhantomJS (browser build)

`grunt test:node` - Run tests through Node (CommonJS build)


## Building

`grunt build` - build 'er
