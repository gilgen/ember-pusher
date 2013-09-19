var browserGlobal = (typeof window !== 'undefined') ? window : {};
var Ember = browserGlobal.Ember;
var Pusher = browserGlobal.Pusher;

var initialize = function() {
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

