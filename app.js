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
const paypal = require('paypal-rest-sdk');
///// npm install js-cookie

const multipart = require("connect-multiparty");

let bodyParser = require("body-parser");

const cors = require('cors')
const corsOptions = {
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'UPDATE'],
  credentials: true
};
app.use(cors(corsOptions));
let url = require('url');
///// let port = process.env.PORT || 1337;
console.log('app.js ligne 20...');

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));


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


paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'Aa9a_yrXSzcTpuZni8FtQkYvk98vs0oTkfwD2UaCpQ8vaJcGUN2g9xBZZ9sqwfXnFxnXmrSQrd8Qr6IH',
  'client_secret': 'EL3O6sJe0CgtMZszBgigMEu1Ja6qXi_OxfscVHTq7--Im8p01ADMaX3S5ChI_szixchfHx4tw9Xm4F-K'
});
app.post('/pay', (req, res) => {
  //req.header("content-type: application/json, 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE', 'Access-Control-Allow-Headers': 'Content-Type ");
  res.header("content-type: application/json");
  let create_payment_json = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": "http://localhost:8080/success",
      "cancel_url": "http://localhost:8080/cancel"
    },
    "transactions": [{
      "item_list": {
        "items": [{
          "name": "red sox hat",
          "sku": "001",
          "price": "25.00",
          "currency": "USD",
          "quantity": 1
        }]
      },
      "amount": {
        "currency": "USD",
        "total": "25.00"
      },
      "description": "This is the payment description."
    }]
  };
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      console.log("Create Payment Response");
      console.log(payment);
      res.send('test');
    }
  });

});


/*
app.get('/', function (req, res) {
  console.log('DEBUT  public/index.html   res.sendFile ')
  res.sendFile(path.join(__dirname, 'public/index.html')); // views
  //res.send('DEBUT  public/index.html   res.sendFile ');
});*/

// Multiparty Middleware
////const multipartMiddleware = multipart();
//app.get('/getInventaire', multipartMiddleware, inventaire.getInventaire);
app.get('/getInventaire',  inventaire.getInventaire);

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
