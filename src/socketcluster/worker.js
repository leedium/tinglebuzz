const fs = require('fs');
const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const morgan = require('morgan');
const healthChecker = require('sc-framework-health-check');

module.exports.run = function (worker) {
  console.log('   >> Worker PID:', process.pid);
  var environment = worker.options.environment;

  var app = express();

  var httpServer = worker.httpServer;
  var scServer = worker.scServer;

  if (environment === 'dev') {
    // Log every HTTP request. See https://github.com/expressjs/morgan for other
    // available formats.
    app.use(morgan('dev'));
  }
  app.use(serveStatic(path.resolve(__dirname, 'public')));

  // Add GET /health-check express route
  healthChecker.attach(worker, app);

  httpServer.on('request', app);

  var count = 0;

  /*
    In here we handle our incoming realtime connections and listen for events.
  */
  scServer.on('connection', function (socket) {

    // Some sample logic to show how to handle client events,
    // replace this with your own logic

    socket.on('sampleClientEvent', function (data) {
      count++;
      console.log('Handled sampleClientEvent', data);
      scServer.exchange.publish('sample', count);
    });

    var interval = setInterval(function () {
      socket.emit('rand', {
        rand: Math.floor(Math.random() * 5)
      });
    }, 1000);

    socket.on('disconnect', function () {
      clearInterval(interval);
    });
  });
};