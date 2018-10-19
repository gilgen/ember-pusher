import EmberObject from '@ember/object';
import BindingsMixin from 'ember-pusher/mixins/bindings';
import { module, test } from 'qunit';

module('Unit | Mixin | bindings');

// Replace this with your real tests.
test('it works', function(assert) {
  let BindingsObject = EmberObject.extend(BindingsMixin);
  let subject = BindingsObject.create();
  assert.ok(subject);
});
