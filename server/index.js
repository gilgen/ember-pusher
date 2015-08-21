var bodyParser = require('body-parser');
var Pusher = require('pusher');

var PUSHER_TEST_APP_ID = '136637';
var PUSHER_TEST_KEY = '9fc4aa910e88193306b6';
var PUSHER_TEST_SECRET = '43f730cb73aa436b24f4';

var token = '' + Date.now() + Math.random();

var pusher = new Pusher({
  appId: PUSHER_TEST_APP_ID,
  key: PUSHER_TEST_KEY,
  secret: PUSHER_TEST_SECRET,
  encrypted: true
});

module.exports = function(app) {
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/pusher/token', function(req, res) {
    res.send(token);
  });

  app.post('/pusher/trigger', function(req, res) {
    function callback(pusherErr, pusherReq, pusherRes) {
      if (pusherErr) {
        res.status(422).send({ error: pusherErr });
        console.log("An error occured while communicating with Pusher:\n");
        console.log(pusherErr);
      } else {
        res.send();
      }
    }

    // console.log("Pusher#trigger:", req.body);

    var data = req.body.data || {};
    data.__ember_pusher_token__ = token;

    pusher.trigger(
      req.body.channel,
      req.body.event,
      data,
      req.body.socketId,
      callback
    );
  });
};
