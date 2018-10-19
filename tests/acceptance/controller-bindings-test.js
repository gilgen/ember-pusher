/* global Pusher */
import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

function newMessage(message) {
  return Pusher.singleton.trigger('controller-bindings', 'new-message', { message: message });
}

module('Acceptance | Controller bindings', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /scenarios/controller-bindings', async function(assert) {
    await visit('/scenarios/controller-bindings');

    assert.equal(currentURL(), '/scenarios/controller-bindings');

    newMessage("Jamie");
    assert.equal(find('.message-list-item').length, 1);

    newMessage("rides");
    newMessage("bikes");
    assert.equal(find('.message-list-item').length, 3);
  });
});
