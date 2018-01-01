/* jshint esversion:6 */
/* global require process */

(function () {
  'use strict';

  const express = require('express');
  const bodyParser = require('body-parser');
  const log4js = require('log4js');
  const dat = require('./dat');

  const logger = log4js.getLogger('server');
  logger.level = process.env.LOG_LEVEL;

  const app = express();
  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    res.status(200).send('Hi there');
  });

  app.post('/wall', (req, res) => {
    if (req.body.key) {
      dat.join(req.body.name, req.body.key)
      .then(() => res.sendStatus(200))
      .catch(err => res.status(500).json(err));
    } else {
      dat.create(req.body.name)
      .then(key => res.status(200).json({key}))
      .catch(err => res.status(500).json(err));
    }
  });

  const port = Number(process.env.PORT);
  const server = app.listen(port, err => {
    logger.debug(`Dat Wall server listening on port ${port}, running Node ${process.version}`);
  });
})();