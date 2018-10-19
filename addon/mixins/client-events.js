import Mixin from '@ember/object/mixin';

export default Mixin.create({
  // Fire an event programmatically. All Events must unfortunately use
  // the client-<eventname> format for client events (a pusher restriction).
  pusherTrigger(channelName, eventName, data) {
    let channel = this.pusher.channelFor(channelName);
    channel.trigger(eventName, data);
  }
});
