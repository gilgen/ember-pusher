export function initialize() {
  // TODO: Use `Ember.inject.service()` instead.

  const application = arguments[1] || arguments[0];
  application.inject('controller', 'pusher', 'service:pusher');
  application.inject('route', 'pusher', 'service:pusher');
}

export default {
  name: 'ember-pusher-injections',
  initialize: initialize
};
