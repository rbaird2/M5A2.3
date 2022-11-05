// name: Raymond Baird
// id: 1215758778
// date created: 11/5/2022
// description: project to utilize api and access MongoDB

'use strict';

const express = require('express');
const morgan = require('morgan');
const jsonwebtoken = require('jsonwebtoken');

const userHandler = require('./routes/loanRoutes');
const loanController = require('./routes/loanRoutes');

const app = express();

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use(function(req, res, next) {
  console.log("WTF?")
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/loans', userHandler, loanController);

module.exports = app;
