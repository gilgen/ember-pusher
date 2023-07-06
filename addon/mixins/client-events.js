import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';

export default Mixin.create({
  pusher: service(),

  // Fire an event programmatically. All Events must unfortunately use
  // the client-<eventname> format for client events (a pusher restriction).
  pusherTrigger(channelName, eventName, data) {
    let channel = this.pusher.channelFor(channelName);
    channel.trigger(eventName, data);
  },
});
