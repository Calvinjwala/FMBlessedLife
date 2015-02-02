var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    ejs = require('ejs'),
    oauth = require('oauth'),
    morgan = require('morgan'),
    methodOverride = require('method-override'),
    bodyParser = require('body-parser');
    flash = require('connect-flash'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session'),
    io = require('socket.io').listen(server);
    var geocoderProvider = 'google';
    var httpAdapter = 'http';
    var geocoder = require('node-geocoder').getGeocoder(geocoderProvider, httpAdapter);


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));



// app.use(passport.initialize());
// app.use(passport.session());
app.use(flash());

app.use(cookieSession({
  secret: 'thisismysecretkey', // generate a random hash
  name: 'cookie',
  maxage: 604800000
}));

// connect to Twitter
var Twitter = require('node-tweet-stream'),
  t = new Twitter({
    consumer_key: 'bsGDfum88cEX6tk2fYnrNSBqb',
    consumer_secret: 'sqhJDoo3TZ6b3lnooyu1zxALYTNOicz0vUm85du9wmaxJ12Mln',
    token: '380652762-qhmqCrEZbf17sYirC8gUZD1BSYlgZgKmiS4VI9xQ',
    token_secret: 'P1Tw0f0D1xPvvlPMaGFRji5vVbPwyaHUPsK5D5540k6fF'
  });


// connect to socket
io.on('connection', function(socket) {
  console.log('user connected');
  socket.on('disconnect', function() {
  console.log('user disconnected');
  });
});


// stream tweets
// .emit 'recieve tweet' - calls function within globe_tweet.js file
t.on('tweet', function (tweet) {
  blessedCounter = 0;
  if (tweet != null || tweet != undefined) {
    blessedCounter++;
  }
  console.log('tweet received: ', tweet);
  console.log('blessedCounter: ', blessedCounter);
  io.sockets.emit('receive_tweet', tweet);
});

app.get('/', function(req,res){
  // blessedCounter = 0;
  // var searchKey1 = '#blessed';
  // // var searchKey2 = 'fml';
  // t.track(searchKey1);
  // // t.track(searchKey2);
  // console.log('tracking', searchKey1);
  res.render('index');
});

app.get('*', function(req,res){
  res.render('404');
});

server.listen(process.env.PORT || 3000, function(){
  console.log("it starts on level 3k");
});

