import Ember from 'ember';
import BindingsMixin from 'ember-pusher/mixins/bindings';
import { module, test } from 'qunit';

module('Unit | Mixin | bindings');

// Replace this with your real tests.
test('it works', function(assert) {
  var BindingsObject = Ember.Object.extend(BindingsMixin);
  var subject = BindingsObject.create();
  assert.ok(subject);
});
