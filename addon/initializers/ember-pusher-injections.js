export function initialize(application) {
  application.inject('controller', 'pusher', 'service:pusher');
  application.inject('route', 'pusher', 'service:pusher');
}

export default {
  name: 'ember-pusher-injections',
  initialize: initialize
};
