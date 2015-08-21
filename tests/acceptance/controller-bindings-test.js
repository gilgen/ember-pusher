import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';
import { trigger } from '../helpers/pusher';
import { tryRepeatedly } from '../helpers/try';

module('Acceptance | Controller bindings', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /scenarios/controller-bindings', function(assert) {
  function newMessage(message) {
    return trigger('controller-bindings', 'new-message', { message: message });
  }

  visit('/scenarios/controller-bindings');

  andThen(() => {
    assert.equal(currentURL(), '/scenarios/controller-bindings');
  });

  andThen(() => newMessage("Jamie"));
  andThen(() => tryRepeatedly(assert, () => {
    return find('.message-list-item').length === 1;
  }));

  andThen(() => newMessage("rides"));
  andThen(() => newMessage("bikes"));
  andThen(() => tryRepeatedly(assert, () => {
    return find('.message-list-item').length === 3;
  }));
});
