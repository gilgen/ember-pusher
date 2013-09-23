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
      var pusherController, options, pusher;
      container.register('controller:pusher', Controller);

      pusherController = container.lookup('controller:pusher');
      options = application.PUSHER_OPTS;

      Ember.assert("You need to provide PUSHER_OPTS on your application", options);
      Ember.assert("You need to include the pusher libraries", Pusher);
      pusher = new Pusher(options.key, options.connection);
      pusherController.didCreatePusher(pusher);
    }
  });

}

export { initialize };

