var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Agrega body-parser

const { mongoURL } = require('./config').variablesDeConfiguracion;

const databaseUrl = mongoURL;

mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('open', function () {
  console.log("Connection OK");
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const cookbookRouter = require('./routes/cookbook');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

// Configuración de tamaño máximo permitido
app.use(bodyParser.json({ limit: '20mb' }));  // <---- AQUI
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cookbook', cookbookRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
