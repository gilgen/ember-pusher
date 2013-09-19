var global = (typeof window !== 'undefined') ? window : {};
var Ember = global.Ember;

import { Controller } from "./ember-pusher/controller";
import { Bindings } from "./ember-pusher/bindings";
import { ClientEvents } from "./ember-pusher/client_events";
import { initialize } from "./ember-pusher/initializer";

Ember.PusherController = Controller;
Ember.PusherClientEvents = ClientEvents;
Ember.PusherBindings = Bindings;

initialize();

