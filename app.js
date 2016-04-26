var express = require('express.io');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var shortid = require('shortid');

var routes = require('./routes/index');
var users = require('./routes/users');

var newCat = require('./includes/cat');
var gameClock = require('./includes/gameclock');
var player = require('./includes/player');


// game setup
var players = [];
var clock = gameClock();
var cat = newCat();

var port = process.env.PORT || 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var instantiatePlayer = function(socket) {
  socket.player = player(shortid.generate());
  return socket;
}


io.on('connection', function(socket){

  players.push(instantiatePlayer(socket));

  socket.on('disconnect', function() {
    console.log('Got disconnect!');
    var i = players.indexOf(socket);
    players.splice(i, 1);
  });

  socket.on('key', function(msg){
    socket.player.addKey();
    socket.emit('log:key', msg + " pressed");
    io.emit('log:active', "Key pressed by a user!");
  });

  socket.on('click', function(){
    socket.player.addClick();
    socket.emit('log:click', "Clicked!");
    io.emit('log:active', "Click clicked by a user!");
  });

  socket.on('clock:on', function() {
    console.log("clock on!");
    clock.poll(io, players, cat);
  });

  socket.on('clock:off', function() {
    console.log("clock off!");
  });

});


module.exports = app;

// app.listen(port);
http.listen(port, function(){
  console.log('listening on *:3000');
});