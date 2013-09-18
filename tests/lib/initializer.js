var initializer, container, application, controller;

module("initializer", {
  setup: function() {
    application = Em.Application.create({
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

// test("initializer sets up pusher", function() {
//   throws(function() {
//     Em.Application.create()
//   }, "throws an exception because PUSHER_OPTS is not defined");
// });

