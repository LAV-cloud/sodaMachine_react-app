const soda = require('../app/controllers/sodas');
const upload = require('../app/middleware/upload');

const express = require('express');

module.exports = (app) => {
  app.use('/images', express.static('uploads'));

  app.options('/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, Content-Length, X-Requested-With'
    );
    res.sendStatus(200);
  });

  app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

  app.post('/sodas', upload.single('image'), soda.createSoda);
  app.get('/sodas', soda.getSodas);
};
