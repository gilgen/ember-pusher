var global = (typeof window !== 'undefined') ? window : {},
    Ember = global.Ember,
    Pusher = global.Pusher;

var initialize = function() {

  if(!Ember) {
    throw("Include Ember before EmberPusher");
  }

  Ember.Application.initializer({
    name: "pusherConnected",

    initialize: function(container, application) {
      container.register('controller:pusher', Ember.PusherController);

      var pusherController = container.lookup('controller:pusher'),
          options = application.PUSHER_OPTS;

      Ember.assert("You need to provide PUSHER_OPTS on your application", options);
      Ember.assert("You need to include the pusher libraries", Pusher);
      var pusher = new Pusher(options.key, options.connection);

      pusherController.didCreatePusher(pusher);
    }
  });
};

export { initialize };

