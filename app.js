let express = require('express');
const authRoutes = require('./routes/auth-routes');
let path = require('path');
let http = require('http');
//let carrefour = require('./routes/Inventaire');
let inventaire = require('./routes/Inventaire');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');


///// npm install js-cookie

const multipart = require("connect-multiparty");

let bodyParser = require("body-parser");

const cors = require('cors')
const corsOptions = {
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'UPDATE'],
  credentials: true
};

let url = require('url');
///// let port = process.env.PORT || 1337;
console.log('app.js ligne 20...');

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));

app.set('port', process.env.PORT || 5001);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));
//initialize passport
app.use(passport.initialize());
app.use(passport.session() );

/*d
app.get('/', function (req, res) {
  console.log('DEBUT  public/index.html   res.sendFile ')
  res.sendFile(path.join(__dirname, 'public/index.html')); // views
  //res.send('DEBUT  public/index.html   res.sendFile ');
});*/

// Multiparty Middleware
const multipartMiddleware = multipart();
app.get('/getInventaire', multipartMiddleware, inventaire.getInventaire);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found (Voir dans server.js)');
  err.status = 404;
  next(err);
});

http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
});

console.log('Listening on port 5001...');
