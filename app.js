//const dotenv = require('dotenv')

var createError = require('http-errors');
var express = require('express'); // Require library of code that is Express
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

// Routers that have all the get/post etc routes

var indexRouter = require('./routes/index');
var createCubeRouter = require('./routes/create');
var attachAccessoryRouter = require('./routes/attach');
var detailsRouter = require('./routes/details');
var aboutRouter = require('./routes/about');
var loginRouter= require('./routes/login');
var editRouter= require('./routes/edit');
var deleteRouter = require('./routes/delete');
//var registerRouter = require('./routes/register');
var usersRouter = require('./routes/users');
var loginDashboard = require('./routes/dashboard');
const passport = require('passport');

const hbs = require('hbs');
const flash = require('connect-flash');
const session = require('express-session');

//passport config
//const initializePassport = require('./passport-config');

require('./config/passport')(passport);

const methodOverride = require('method-override');
const router = require('./routes/index');





//initializePassport(passport);

// Create a variable named "app" to represent our application and invoke Express()
var app = express(); 

// Hide your Mongo connection variables 
require('dotenv').config();

// Mongo DB Connection 
const dbURI = process.env.DB_URI;

  mongoose.connect(process.env.DB_URI,  {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then( (res) => console.log('db connected'))
    .catch((err) => console.log(err));

// View Engine Setup

app.set('views', path.join(__dirname, 'views')); // setting folder for public files
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs'); // setting view engine to hbs, engine compiles views and data into HTML

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Express Session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect Flash
app.use(flash());

//Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();

});


// Routes
app.use('/', indexRouter); // Router for home page 
app.use('/create', createCubeRouter);
app.use('/attach', attachAccessoryRouter);
app.use('/details', detailsRouter);
app.use('/about', aboutRouter);
//app.use('/login', loginRouter);
app.use('/edit', editRouter);
//app.use('/register', registerRouter);
app.use('/users', usersRouter);
//app.use('/logout', usersRouter);
app.use('/dashboard', loginDashboard);
app.use(methodOverride('_method'));
app.use('/delete', deleteRouter);

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
