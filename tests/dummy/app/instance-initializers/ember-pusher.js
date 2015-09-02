export function initialize(instance) {
  let pusherService = instance.container.lookup('service:pusher');
  pusherService.setup('test-stub-key');
}

export default {
  name: 'ember-pusher',
  initialize: initialize
};
