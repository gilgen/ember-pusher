Ember Pusher
============

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

# Running the tests
`bundle exec rackup` and visit `http://localhost:9292`

# Building
If you want to create a production build, you can just run things like:

`BUILD_ENV=production bundle exec rackup` and then hit the test suite which
generates a dist/ember-pusher.min.js

