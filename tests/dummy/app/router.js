import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('scenarios', function() {
    this.route('controller-bindings');
  });
});

export default Router;
