describe("Controller", function() {
  var App, targetController, pusherController, channelName, bindings;

  var FakeController = Em.Controller.extend(EmberPusher.Bindings, {
    PUSHER_SUBSCRIPTIONS: {
      craycraychannel: ['event-one', 'event-two']
    },
    eventOne: function(){ return "event-one-fired"; },
    eventTwo: function(){ return "event-two-fired"; }
  });

  Ember.Application.initializer({
    name: "registerFakeController",
    initialize: function(container, application) {
      container.register('controller:fake', FakeController);
      targetController = container.lookup('controller:fake');
    }
  });

  App = Ember.Application.create({
    PUSHER_OPTS: { key: 'foo' }
  });

  before(function(){
    pusherController = App.__container__.lookup('pusher:main');
    pusherController.get('connection').connection.socket_id = '1234';
    channelName = 'craycraychannel';
    bindings = pusherController.get('bindings');
  });

  describe("sanity", function(){
    it("exists", function() {
      assert.ok(EmberPusher.Controller, "Ember.PusherController exists");
      assert.ok(pusherController.get('connection'), "pusher initialized");
    });

    it("initializes the bindings object properly", function() {
      assert.ok(pusherController.get('bindings'));
    });
  });

  describe("wire", function() {
    it("initializes channelName in the bindings hash", function() {
      assert.ok(pusherController.get('bindings')[channelName], "Creates a channel name");
    });

    it("initializes eventBindings in the bindings hash", function() {
      var targetId = targetController._pusherEventsId();
      assert.ok(bindings[channelName].eventBindings[targetId].length == 2, "Knows about two bound events");
    });
  });

  describe("socketId", function() {
    it("sets a socket ID", function() {
      assert.ok(pusherController.get('socketId'), "Socket ID defined");
    });
  });

  describe("channelFor", function() {
    it("returns a channel object", function() {
      var channel = pusherController.channelFor(channelName);
      assert.ok(channel, "channel defined");
    });
  });

});
