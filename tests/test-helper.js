import $ from 'jquery';
import resolver from './helpers/resolver';
import { setResolver } from 'ember-qunit';

setResolver(resolver);

window.EMBER_PUSHER_TOKEN = $.ajax({
  url: '/pusher/token',
  async: false
}).responseText;
