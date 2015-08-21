import Ember from 'ember';

export function trigger(channel, event, data, socketId) {
  return Ember.$.post(
    '/pusher/trigger',
    { channel, event, data, socketId }
  );
}
