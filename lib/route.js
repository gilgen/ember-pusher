EP.PusherRoute = Em.Mixin.create({

  // TODO:
  // listen to channels defined on PUSHER_SUBSCRIPTIONS
  // keep track of count of times a channel has been subbed to
  // when count 0, disconnect from the channel
  // decrement the count on route deactivate
  // when route is deactivated, unsub from events
  // reference counts to be tracked on the pusher controller

  activate: function() {
    Object.keys(this.PUSHER_SUBSCRIPTIONS).forEach(function (name) {
      pusherController.connectChannel(name);
      pusherController.connectEvents(this.PUSHER_SUBSCRIPTIONS[name]);
    })
  },

  deactivate: function() {
    Object.keys(this.PUSHER_SUBSCRIPTIONS).forEach(function (name) {
      pusherController.disconnectChannel(name);
      pusherController.disconnectEvents(this.PUSHER_SUBSCRIPTIONS[name]);
    })
  }

});

//
//   setupPusherListeners: (controller) ->
//     # TODO: Check to make sure that we have PRELOAD_DATA
//     for channelName, events of @PUSHER_SUBSCRIPTIONS
//       console.log "processing channel: ", channelName
//       for event in events
//         console.log "processing event: ", event
//         controller.pusherListenTo(channelName, event)
//
//   setupPusher: ->
//     return unless PRELOAD_DATA.pusher?
//     @controllerFor('pusher').connect(
//       PRELOAD_DATA.pusher.key,
//       @PUSHER_CHANNELS,
//       @PUSHER_OPTS
//     )
//
//
