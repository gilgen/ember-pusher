import { run } from '@ember/runloop';
import Application from '@ember/application';
import { initialize } from '../../../initializers/ember-pusher-injections';
import { module, /* test, */ skip } from 'qunit';
import { setupTest } from 'ember-qunit';

let registry, application;

module('Unit | Initializer | ember pusher injections', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    run(() => {
      application = Application.create();
      registry = application.registry;
      application.deferReadiness();
    });
  });

  // Replace this with your real tests.
  skip('it works', function (assert) {
    initialize(registry, application);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });
});
