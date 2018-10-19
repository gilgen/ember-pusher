/* global Pusher */
import Controller from '@ember/controller';
import EmberPusher from 'ember-pusher';

export default Controller.extend(EmberPusher.Bindings, {

  /*eslint-disable */
  PUSHER_SUBSCRIPTIONS: {
    "controller-bindings": ['new-message']
  },

  messages: [],
  /*eslint-enable */

  actions: {
    sendMessage(message) {
      Pusher.singleton.trigger('controller-bindings', 'new-message', {
        message: message
      });
    },

    newMessage(data) {
      this.messages.pushObject(data.message);
    }
  }
});
