import Ember from 'ember';
import ClientEventsMixin from 'ember-pusher/mixins/client-events';
import { module, test } from 'qunit';

module('Unit | Mixin | client events');

// Replace this with your real tests.
test('it works', function(assert) {
  var ClientEventsObject = Ember.Object.extend(ClientEventsMixin);
  var subject = ClientEventsObject.create();
  assert.ok(subject);
});
