var App;

module("initializer", {
  setup: function() {
    App = Em.Application.create({
      PUSHER_OPTS: {
        key: '1234321',
        connection: {
          foos: { bar: 'baz' }
        }
      }
    });
  },
  teardown: function() {
    console.log("teardown initializer module");
  }
});

test("initializer sets up pusher", function() {
  ok(App);
});

