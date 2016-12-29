
var request = require('request');
var session = require('express-session');
var url = require('url');
var RedisStore = require('connect-redis')(session);
request.debug=false;
// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var path = require('path');
//var config = require(process.env.CONF||'/etc/nodejs-config/kuntur.json').frontend;
// Setup server
var app = express();
app.get('/test', function(req, res, next) {
 res.send('Ok');
});


var logMiddleware = function() {
  return function(req, res, next) {

    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // console.log(ip);
    req.log = function () {
        var first_parameter = arguments[0];
        var other_parameters = Array.prototype.slice.call(arguments, 1);

        function formatConsoleDate (date) {
            var hour = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            var milliseconds = date.getMilliseconds();
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear();

            return ip+' [' +
                day+
                '/'+
                month+
                '/'+
                year+
                ' '+
                   ((hour < 10) ? '0' + hour: hour) +
                   ':' +
                   ((minutes < 10) ? '0' + minutes: minutes) +
                   ':' +
                   ((seconds < 10) ? '0' + seconds: seconds) +
                   //'.' +
                   //('00' + milliseconds).slice(-3) +
                   '] ';
        }

        console.log.apply(console, [formatConsoleDate(new Date()) + first_parameter].concat(other_parameters));
    };

    next();
  }
}


var sessionMiddleware = session({
  secret: '654fvd5gf21dg',
  resave: true,
  saveUninitialized: true//,
//  store: new RedisStore(localhost)
});

app.use(sessionMiddleware);
app.use(logMiddleware());

app.use(function(req, res, next) {
   req.log("asdasd");//logs
  next();
});

app.use('/', express.static(path.join(__dirname, '..')));
app.use('/bower_components', express.static(path.join(__dirname, '..', 'bower_components')));

var ser = app.listen(3012);

process.on('uncaughtException', function (exception) {
  // handle or ignore error
  console.log("error")
  console.log(exception);
});
