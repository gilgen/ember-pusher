import Ember from 'ember';
import EmberPusher from 'ember-pusher';
import { trigger } from '../../tests/helpers/pusher';

export default Ember.Controller.extend(EmberPusher.Bindings, {

  PUSHER_SUBSCRIPTIONS: {
    "controller-bindings": ['new-message']
  },

  messages: [],

  actions: {
    sendMessage(message) {
      trigger('controller-bindings', 'new-message', {
        message: message
      });
    },

    newMessage(data) {
      this.messages.pushObject(data.message);
    }
  }
});
