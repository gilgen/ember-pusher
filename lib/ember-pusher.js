import { Controller } from "./ember-pusher/controller";
import { Bindings } from "./ember-pusher/bindings";
import { ClientEvents } from "./ember-pusher/client_events";
import { initialize } from "./ember-pusher/initializer";

var browserGlobal = (typeof window !== 'undefined') ? window : {};
var Ember = browserGlobal.Ember;

Ember.PusherController = Controller;
Ember.PusherClientEvents = ClientEvents;
Ember.PusherBindings = Bindings;

initialize();
