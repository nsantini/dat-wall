/* jshint esversion:6 */
/* global require process */

(function () {
  'use strict';

  const path = require('path');
  const Dat = require('dat-node');

  module.exports = {
    create: name => {
      return new Promise((resolve, reject) => {
        const src = path.join(__dirname, '..', 'dat-archive', name);
        // 1. My files are in 'src'
        Dat(src, (err, dat) => {
          if (err) {
            console.log('Error starting Dat. ', err);
            return reject(err);
          }
  
          // 2. Import the files
          dat.importFiles();
  
          // 3. Share the files on the network!
          dat.joinNetwork();
  
          // (And share the link)
          console.log('My Dat link is: dat://', dat.key.toString('hex'));
          resolve(dat.key.toString('hex'));
        });
      });
    },

    join: (name, key) => {
      return new Promise((resolve, reject) => {
        const src = path.join(__dirname, '..', 'dat-archive', name);
        // 1. Tell Dat where to download the files
        Dat(src, {
          // 2. Tell Dat what link I want
          key: key // (a 64 character hash from above)
        }, function (err, dat) {
          if (err) {
            console.log('Error starting Dat. ', err);
            return reject(err);
          }

          // 3. Join the network & download (files are automatically downloaded)
          dat.joinNetwork();
          resolve();
        });
      });
    }
  }
})();