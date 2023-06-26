/* global Pusher */
import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import EmberPusher from 'ember-pusher';

const PUSHER_SUBSCRIPTIONS = {
  'controller-bindings': ['new-message'],
};

// eslint-disable-next-line ember/no-classic-classes
export default Controller.extend(EmberPusher.Bindings, {
  PUSHER_SUBSCRIPTIONS,

  messages: computed(function () {
    return [];
  }),

  sendMessage: action(function (message) {
    Pusher.singleton.trigger('controller-bindings', 'new-message', {
      message: message,
    });
  }),

  newMessage: action(function (data) {
    this.messages.pushObject(data.message);
  }),
});
