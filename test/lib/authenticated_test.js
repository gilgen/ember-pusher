describe("AuthenticateController", function() {
  var App, targetAuthController, pusherController, channelName, bindings;

  var FakeAuthController = Em.Controller.extend(EmberPusher.Bindings, {
    PUSHER_SUBSCRIPTIONS: {
      presenceMessages: ['event-one', 'event-two']
    },
    eventOne: function(){ return "event-one-fired"; },
    eventTwo: function(){ return "event-two-fired"; }
  });

  Ember.Application.initializer({
    name: "registerFakeAuthController",
    initialize: function(container, application) {
      container.register('controller:fake-auth', FakeAuthController);
      targetAuthController = container.lookup('controller:fake-auth');
    }
  });

  App = Ember.Application.create({
    PUSHER_OPTS: { key: 'foo', dasherizeChannel: true }
  });

  before(function(){
    pusherController = App.__container__.lookup('pusher:main');
    pusherController.get('connection').connection.socket_id = '1234';
    channelName = 'presence-messages';
    bindings = pusherController.get('bindings');
  });

  describe("wire", function() {
    it("initializes channelName in the bindings hash", function() {
      assert.ok(pusherController.get('bindings')[channelName], "Creates a channel name");
    });
  });

  describe("channelFor", function() {
    it("returns a channel object", function() {
      var channel = pusherController.channelFor(channelName);
      assert.ok(channel, "channel defined");
    });
  });

});
