export function initialize(application) {
  // TODO: Use `Ember.inject.service()` instead.
  application.inject('controller', 'pusher', 'service:pusher');
  application.inject('route', 'pusher', 'service:pusher');
}

export default {
  name: 'ember-pusher-injections',
  initialize: initialize
};
