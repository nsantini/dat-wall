/* jshint esversion:6 */
/* global require process */

(function () {
  'use strict';

  const cli = require('commander');
  const express = require('express');
  const bodyParser = require('body-parser');
  const log4js = require('log4js');
  const dat = require('./dat');

  // configure command line parser
  cli
    .version('0.0.1')
    .option('-p, --port [port]', 'Run as a web server on specified port', parseInt)
    .option('-l, --level [level]', 'Specify a log level')
    .parse(process.argv);

  const logger = log4js.getLogger('server');
  logger.level = cli.level || 'debug';

  const app = express();
  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    res.status(200).send('Hi there');
  });

  app.post('/wall', (req, res) => {
    try {
      dat.join(req.body.name, req.body.key)
      .then(key => res.status(200).json({key}))
      .catch(err => res.status(500).json(err));
    } catch(err) {
      res.status(500).json(err);
    }
  });

  const server = app.listen(cli.port, err => {
    logger.info(`Dat Wall server listening on port ${cli.port}, running Node ${process.version}`);
  });
})();