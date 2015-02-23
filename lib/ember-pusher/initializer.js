import { Controller } from "./controller";

var global = (typeof window !== 'undefined') ? window : {},
    Ember = global.Ember,
    Pusher = global.Pusher;

function initialize() {

  if(!Ember) { throw("Include Ember before EmberPusher"); }
  if(!Pusher) { throw("Include Pusher before EmberPusher"); }

  Ember.Application.initializer({
    name: "pusherConnected",

    initialize: function(container, application) {
      var pusherController, options, pusher, dict;

      dict = 'pusher:main';
      container.register(dict, Controller);

      pusherController = container.lookup(dict);
      options = application.PUSHER_OPTS;

      Ember.assert("You need to provide PUSHER_OPTS on your application", options);
      Ember.assert("You need to include the pusher libraries", typeof Pusher !== 'undefined');
      pusher = new Pusher(options.key, options.connection);
      pusherController.didCreatePusher(pusher);

      application.inject('controller', 'pusher', dict);
      application.inject('route', 'pusher', dict);
    }
  });

}

export { initialize };

