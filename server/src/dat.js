/* jshint esversion:6 */
/* global require process */

(function () {
  'use strict';

  const path = require('path');
  const Dat = require('dat-node');
  const log4js = require('log4js');
  const logger = log4js.getLogger('dat');
  logger.level = 'debug';

  module.exports = {
    dat: null,
    join: (name, key) => {
      return new Promise((resolve, reject) => {
        const src = path.join(__dirname, '..', 'dat-archive', name);
        const joined = (err, dat) => {
          if (err) {
            logger.error('Error starting Dat. ', err);
            return reject(err);
          }
          this.dat = dat;
          dat.importFiles();
          dat.joinNetwork();
          logger.info('My Dat link is: dat://', dat.key.toString('hex'));
          resolve(dat.key.toString('hex'));
        };

        if (key) {
          Dat(src, { key }, joined);
        } else {
          Dat(src, joined);
        }
      });
    }
  }
})();