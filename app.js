var createError = require('http-errors');
var express = require('express'); // Require library of code that is Express
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

const Accessory = require('./models/accessory')

var indexRouter = require('./routes/index');
var createCubeRouter = require('./routes/create')
var detailsRouter = require('./routes/details');
var aboutRouter = require('./routes/about')
var accessoryRouter = require('./routes/add-accessory');

var app = express(); // Create a variable named "app" to represent our application and invoke Express()

// Mongo DB Connection 

const dbURI = 'mongodb+srv://dbtest:ZPNunG4iNYDzHW4@cluster0.bpcd8.mongodb.net/testdb'
mongoose.connect(dbURI,  {
  useNewUrlParser: true,
  useUnifiedTopology: true
} ).then( (res) => console.log('db connected'))
  .catch((err) => console.log(err))


// view engine setup

app.set('views', path.join(__dirname, 'views')); // setting folder for public files
app.set('view engine', 'hbs'); // setting view engine to hbs, engine compiles views and data into HTML

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




app.use('/', indexRouter); // Router for home page > Contains all routes
app.use('/create', createCubeRouter)
app.use('/accessory', accessoryRouter)
app.use('/details', detailsRouter);
app.use('/about', aboutRouter);

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
