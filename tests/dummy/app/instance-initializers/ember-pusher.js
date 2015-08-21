const PUSHER_TEST_KEY = '9fc4aa910e88193306b6';

export function initialize(instance) {
  let pusherService = instance.container.lookup('service:pusher');
  pusherService.setup(PUSHER_TEST_KEY, {}, {
    token: window.EMBER_PUSHER_TOKEN
  });
}

export default {
  name: 'ember-pusher',
  initialize: initialize
};
