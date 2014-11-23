/* global describe, it */
'use strict';

var assert = require('power-assert');
var async = require('../../');

describe('#compose', function() {

  it('should execute in order of insertion', function(done) {

    var add2 = function(n, cb) {
      assert.equal(n, 3);
      setTimeout(function() {
        cb(null, n + 2);
      }, 50);
    };

    var mul3 = function(n, cb) {
      assert.equal(n, 5);
      setTimeout(function() {
        cb(null, n * 3);
      }, 15);
    };

    var add1 = function(n, cb) {
      assert.equal(n, 15);
      setTimeout(function() {
        cb(null, n + 1);
      }, 100);
    };

    var add2mul3add1 = async.compose(add1, mul3, add2);

    add2mul3add1(3, function(err, res) {
      if (err) {
        return done(err);
      }
      assert.equal(res, 16);
      done();
    });

  });

  it('should execute in order of insertion with binding', function(done) {

    var pow2 = function(n, cb) {
      var self = this;
      assert.equal(n, 3);
      setTimeout(function() {
        cb(null, self.pow(n, 2));
      }, 50);
    };

    var mul3 = function(n, cb) {
      assert.equal(n, 9);
      setTimeout(function() {
        cb(null, n * 3);
      }, 15);
    };

    var pow3 = function(n, cb) {
      var self = this;
      assert.equal(n, 27);
      setTimeout(function() {
        cb(null, self.pow(n, 3));
      }, 100);
    };

    var add2mul3add1 = async.compose(pow3, mul3, pow2);

    add2mul3add1.call(Math, 3, function(err, res) {
      if (err) {
        return done(err);
      }
      assert.equal(res, 19683);
      done();
    });

  });

  it('should cause error', function(done) {

    var add2 = function(n, cb) {
      assert.equal(n, 3);
      setTimeout(function() {
        cb(null, n + 2);
      }, 50);
    };

    var mul3 = function(n, cb) {
      assert.equal(n, 5);
      setTimeout(function() {
        cb(new Error('error'));
      }, 15);
    };

    var add1 = function(n, cb) {
      setTimeout(function() {
        cb(null, n + 1);
      }, 100);
    };

    var add2mul3add1 = async.compose(add1, mul3, add2);

    add2mul3add1(3, function(err) {
      assert.ok(err);
      done();
    });

  });
});

