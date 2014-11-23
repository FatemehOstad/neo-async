/* global describe, it */
'use strict';

var assert = require('power-assert');
var async = require('../../');

describe('#createLogger', function() {

  it('should test logger', function(done) {

    var fn = function(name) {

      return function(arg, callback) {

        assert.equal(arg, name);
        callback(null, name);
      };
    };

    var names = ['log', 'dir', 'test'];
    var name = names.shift();
    var logger = async.createLogger(name);

    logger(fn(name), name, function(err, res) {
      if (err) {
        return done(err);
      }

      assert.equal(res, 'log');
      name = names.shift();
      logger = async.createLogger(name);

      logger(fn(name), name, function(err, res) {
        if (err) {
          return done(err);
        }

        assert.equal(res, 'dir');
        name = names.shift();
        logger = async.createLogger(name);

        logger(fn(name), name, function(err, res) {
          if (err) {
            return done(err);
          }

          assert.equal(res, 'test');
          done();
        });
      });
    });

  });

});

