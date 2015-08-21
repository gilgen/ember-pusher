import Ember from 'ember';

export function tryRepeatedly(assert, callback, options={}) {
  let timeout = options.timeout || 10000;
  let rate = options.rate || 200;

  return new Ember.RSVP.Promise(resolve => {
    let token = setInterval(() => {
      if (Ember.run(callback)) {
        clearInterval(token);
        assert.ok(true);
        resolve();
      }
    }, rate);

    setTimeout(() => {
      clearInterval(token);
      assert.ok(false);
      resolve();
    }, timeout);
  });
}
