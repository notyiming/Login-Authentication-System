const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const {setUser} = require('./middleware/setUser');


const homeRouter = require('./routes/home');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const aboutRouter = require('./routes/about');
const contactsRouter = require('./routes/contacts');
const helpRouter = require('./routes/help');
const adminRouter = require('./routes/admin');
const logoutRouter = require('./routes/logout');


const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(setUser);

app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/about', aboutRouter);
app.use('/register', registerRouter);
app.use('/contacts', contactsRouter);
app.use('/help', helpRouter);
app.use('/admin', adminRouter);
app.use('/logout', logoutRouter);


//page not found
app.use(function(req, res) {
  res.status(404).render('../views/pages/pageNotFound', {pageTitle: 'Not Found'});
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('../views/pages/error');
});

module.exports = app;
