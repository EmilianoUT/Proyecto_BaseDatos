const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const Long = require('mongodb').Long;
const url = 'mongodb://localhost:27017/Base_de_Datos';
const assert = require('assert');
const bodyParser = require('body-parser');
const router = express.Router();
const objectId = require('mongodb').ObjectID;
const dbName = 'Base_de_Datos';
const client = new MongoClient(url, { useUnifiedTopology: true });





/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/get-data', function (req, res, next) {
  var resultArray = [];
  client.connect(url, function (err, db) {
    assert.equal(null, err);
    var cursor = db.collection('customers').find();
    cursor.forEach(function (doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function () {
      db.close();
      res.render('index', { items: resultArray });
    });
  });
});

router.post('/insert', function (req, res, next) {
  var item = {
    Adress: req.body.address,
    City: req.body.city,
    Country: req.body.country,
    District: req.body.district,
    LastName: req.body.surname,
    FirstName: req.body.name,
    Status: true
  };

  client.connect(url, function (err, db) {
    assert.equal(null, err);
    db.collection('customers').insertOne(item, function (err, result) {
      assert.equal(null, err);
      console.log('Item inserted');
      db.close();
    });
  });

  res.redirect('/');
});

router.post('/update', function (req, res, next) {
  var item = {
    Adress: req.body.address,
    City: req.body.city,
    Country: req.body.country,
    District: req.body.district,
    LastName: req.body.surname,
    FirstName: req.body.name,
    Status: true
  };
  var id = req.body.id;

  client.connect(url, function (err, db) {
    assert.equal(null, err);
    db.collection('customers').updateOne({ "_id": objectId(id) }, { $set: item }, function (err, result) {
      assert.equal(null, err);
      console.log('Item updated');
      db.close();
    });
  });
});

router.post('/delete', function (req, res, next) {

  var item = {
    Status: false
  };
  var id = req.body.id;

  client.connect(url, function (err, db) {
    assert.equal(null, err);
    db.collection('customers').updateOne({ "_id": objectId(id) }, { $set: item }, function (err, result) {
      assert.equal(null, err);
      console.log('Item updated');
      db.close();
    });
  });
});


router.get('/get-places', function (req, res, next) {
  var resultArray = [];
  client.connect(url, function (err, db) {
    assert.equal(null, err);
    var cursor = db.collection('places').find();
    cursor.forEach(function (doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function () {
      db.close();
      res.render('index', { places: resultArray });
    });
  });
});


module.exports = router;

