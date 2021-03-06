var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var config = require('config')
var flash = require('connect-flash');
var moment = require('moment')

var indexRouter = require('./routes/index')
var loginRouter = require('./routes/login')
var logoutRouter = require('./routes/logout')
var usersRouter = require('./routes/users')
var settingsRouter = require('./routes/settings')
var scannersRouter = require('./routes/scanners')
var apiRouter = require('./routes/api')
var entriesRouter = require('./routes/entries')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.locals.moment = moment;

app.use(logger('dev'));
app.use(flash())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/logout', logoutRouter)
app.use('/users', usersRouter)
app.use('/settings', settingsRouter)
app.use('/scanners', scannersRouter)
app.use('/api', apiRouter)
app.use('/entries', entriesRouter)

// passport config
var Users = require('./models/Users');
passport.use(new LocalStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

// mongoose
mongoose.connect(config.mongodb);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
