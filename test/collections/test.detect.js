/* global describe, it */
'use strict';

var assert = require('power-assert');
var async = require('../../');

function detectIterator(order) {

  return function(num, callback) {

    var self = this;

    setTimeout(function() {

      if (self && self.round) {
        num = self.round(num);
      }

      order.push(num);
      callback(num % 2);
    }, num * 10);
  };
}

describe('#detect', function() {

  it('should execute iterator by collection of array', function(done) {

    var order = [];
    var collection = [1, 3, 2, 4];
    async.detect(collection, detectIterator(order), function(res) {
      assert.deepEqual(res, 1);
      assert.deepEqual(order, [1]);
      done();
    });

  });

  it('should execute iterator by collection of object', function(done) {

    var order = [];
    var collection = {
      a: 5,
      b: 3,
      c: 2
    };
    async.detect(collection, detectIterator(order), function(res) {
      assert.deepEqual(res, 3);
      assert.deepEqual(order, [2, 3]);
      done();
    });

  });

  it('should execute iterator with binding', function(done) {

    var order = [];
    var collection = {
      a: 1.1,
      b: 3.5,
      c: 2.6
    };

    async.detect(collection, detectIterator(order), function(res) {
      assert.deepEqual(res, 1.1);
      assert.deepEqual(order, [1]);
      done();
    }, Math);

  });
});

describe('#detectSeries', function() {

  it('should execute iterator by collection of array', function(done) {

    var order = [];
    var collection = [1, 3, 2, 4];
    async.detectSeries(collection, detectIterator(order), function(res) {
      assert.deepEqual(res, 1);
      assert.deepEqual(order, [1]);
      done();
    });

  });

  it('should execute iterator by collection of object', function(done) {

    var order = [];
    var collection = {
      a: 5,
      b: 3,
      c: 2
    };
    async.detectSeries(collection, detectIterator(order), function(res) {
      assert.deepEqual(res, 5);
      assert.deepEqual(order, [5]);
      done();
    });

  });

  it('should execute iterator with binding', function(done) {

    var order = [];
    var collection = {
      a: 1.1,
      b: 3.5,
      c: 2.6
    };

    async.detectSeries(collection, detectIterator(order), function(res) {
      assert.deepEqual(res, 1.1);
      assert.deepEqual(order, [1]);
      done();
    }, Math);

  });
});

describe('#detectLimit', function() {

  it('should execute iterator in limited by collection of array', function(done) {

    var order = [];
    var collection = [2, 3, 1];

    async.detectLimit(collection, 2, detectIterator(order), function(res) {
      assert.deepEqual(res, 3);
      assert.deepEqual(order, [2, 3]);
      done();
    });

  });

  it('should execute iterator to series by collection of object', function(done) {

    var order = [];
    var collection = {
      a: 2,
      b: 3,
      c: 1,
      d: 3,
      e: 1
    };
    async.detectLimit(collection, 3, detectIterator(order), function(res) {
      assert.deepEqual(res, 1);
      assert.deepEqual(order, [1]);
      done();
    });

  });

  it('should execute iterator to series with binding', function(done) {

    var order = [];
    var collection = {
      a: 1.1,
      b: 3.5,
      c: 2.7
    };

    async.detectLimit(collection, 2, detectIterator(order), function(res) {
      assert.deepEqual(res, 1.1);
      assert.deepEqual(order, [1]);
      done();
    }, Math);

  });

});

