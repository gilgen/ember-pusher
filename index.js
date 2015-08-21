/* jshint node: true */
'use strict';

var server = require('./server') ;

module.exports = {
  name: 'ember-pusher',

  testemMiddleware: function(app) {
    return server(app);
  }
};
