import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';

export default Mixin.create({
  pusher: service(),

  init() {
    if (this.PUSHER_SUBSCRIPTIONS) {
      Object.keys(this.PUSHER_SUBSCRIPTIONS).forEach((channelName) => {
        let events = this.PUSHER_SUBSCRIPTIONS[channelName];
        this.pusher.wire(this, channelName, events);
      });
    }

    return this._super(...arguments);
  },

  willDestroy() {
    if (this.PUSHER_SUBSCRIPTIONS) {
      Object.keys(this.PUSHER_SUBSCRIPTIONS).forEach((channelName) => {
        this.pusher.unwire(this, channelName);
      });
    }

    return this._super(...arguments);
  },

  _pusherEventsId() {
    return this.toString();
  },
});
