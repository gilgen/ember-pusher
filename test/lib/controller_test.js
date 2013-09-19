var App, targetController, pusherController, channelName, bindings;

Ember.FakeController = Em.Controller.extend(Em.PusherBindings, {
  PUSHER_SUBSCRIPTIONS: {
    craycraychannel: ['event-one', 'event-two']
  }
});

Ember.Application.initializer({
  name: "createFakeController",
  initialize: function(container, application) {
    container.register('controller:fake', Ember.FakeController);
    targetController = container.lookup('controller:fake');
  }
});

App = Ember.Application.create({
  PUSHER_OPTS: { key: 'foo' }
});

describe("Controller", function() {

  before(function(){
    pusherController = App.__container__.lookup('controller:pusher');
    channelName = 'craycraychannel';
    bindings = pusherController.get('bindings');
  });

  describe("sanity", function(){
    it("exists", function() {
      assert.ok(Ember.PusherController, "Ember.PusherController exists");
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

});
