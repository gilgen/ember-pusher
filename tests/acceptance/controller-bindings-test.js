import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

module('Acceptance | Controller bindings', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

function newMessage(message) {
  return Pusher.singleton.trigger('controller-bindings', 'new-message', { message: message });
}

test('visiting /scenarios/controller-bindings', function(assert) {
  visit('/scenarios/controller-bindings');
  
  andThen(() => {
    assert.equal(currentURL(), '/scenarios/controller-bindings');

    newMessage("Jamie");
    assert.equal(find('.message-list-item').length, 1);

    newMessage("rides");
    newMessage("bikes");
    assert.equal(find('.message-list-item').length, 3);
  });
});
