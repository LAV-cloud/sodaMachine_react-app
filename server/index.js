const express = require('express');
const mongoose = require('mongoose');
require('./app/models');
const http = require('http');

const config = require('./config');
const { PORT, mongoUri } = config.app;

const app = express();

//  for json req.body
config.express(app);
config.router(app);

const server = http.createServer(app);

mongoose
  .connect(mongoUri)
  .then(() =>
    server.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
  )
  .catch((err) => console.err(`Error connecting to mongo: ${mongoUri}`, err));
