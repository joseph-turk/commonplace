var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var mongoose = require('mongoose');
var session = require('express-session');


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

if (env === 'development') {
  var db = mongoose.connect('mongodb://localhost/commonplaceDB');
} else {
  var db = mongoose.connect('mongodb://jrturk:commonplace@ds019882.mlab.com:19882/commonplace');
}

// Set port to serve on localhost
var port = process.env.PORT || 3000;

// Set location for static files
app.use(express.static('public'));

// Use body parser and cookie parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Session handling
app.use(session({
  secret: 'cmnplc',
  name: 'commonplace',
  resave: true,
  saveUninitialized: true
}));

require('./src/config/passport')(app);

// Set location and engine for views
app.set('views', './src/views');
app.set('view engine', 'ejs');

// Routers
var quoteRouter = require('./src/routes/quoteRoutes.js')();
var indexRouter = require('./src/routes/indexRoutes.js')();
var settingsRouter = require('./src/routes/settingsRoutes.js')();
var editRouter = require('./src/routes/editRoutes.js')();
var authRouter = require('./src/routes/authRoutes.js')();
var aboutRouter = require('./src/routes/aboutRoutes.js')();
//var userRouter = require('./src/routes/userRoutes.js')();

// Authentication-Checking Middleware
function authChecker(req, res, next) {
  if (req.user) {
      next();
  } else {
     res.render('index', {
       user: null,
       book: null,
       message: 'Please log in or sign up.'
     });
  }
}

// Routes to Limit to Authenticated Users
app.use('/quotes', authChecker);
app.use('/edit', authChecker);

// Page Routes
app.use('/', indexRouter);
app.use('/quotes', quoteRouter);
app.use('/edit', editRouter);
app.use('/settings', settingsRouter);
app.use('/auth', authRouter);
app.use('/about', aboutRouter);
//app.use('/users', userRouter);

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// Start server
app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Running server on port ' + port + '.');
  }
});
