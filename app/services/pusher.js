// This is required for ember-browserify to work properly.
// https://github.com/ef4/ember-browserify#the-workaround
import { Pusher } from 'npm:pusher-js';

export { default } from 'ember-pusher/services/pusher';
