var express = require('express');
var router = express.Router();

// Include mongoose and data model for sentence
var mongoose = require('mongoose');
var Sentence = mongoose.model('Sentence');

// set up Gridfs
var mongooseConn = mongoose.connection;
var fs = require('fs');
var Grid = require('gridfs-stream');
// Grid.mongo = mongoose.mongo;
var gfs = Grid(mongooseConn.db, mongoose.mongo);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//
// Routes here for backend API
// POST /saveSentence
router.post('/sentences', function(request, response, next) {
  // save sentence to mongo here
  var sentence = new Sentence(request.body);
  console.dir(sentence);

  // Call Mongoose's built-in save function for Sentence
  // and pass it a callback to handle error and success cases
  sentence.save(function(error, sentence) {
    if (error) {
      return next(error);
    }

    // If no error, send added sentence back to the client.
    response.json(sentence);
  });
});

// GET /sentences (all)
router.get('/sentences', function(request, response, next) {
  Sentence.find(function(error, sentences) {
    if (error) {
      return next(error);
    }

    // If no error, send retrieved sentences back to client
    response.json(sentences);
  });
});

// Get /sentences/:sentenceId
router.get('/sentences/:sentenceId', function(request, response, next) {

  Sentence.findById(request.params.sentenceId,
    function dbCallback (error, sentence) {
      if (error) {
        return next(error);
      }
      if (!sentence) {
        return next(new Error('can\t find sentence'));
      }

      // We've got a sentence, send it to the client as JSON
      response.json(sentence);
    });
});



router.get('/save', function(request, response, next) {
    // Streaming to GridFS
    // Filename to store in MongoDB
    var writeStream = gfs.createWriteStream({
      filename: 'mongo_file.txt'
    });
    fs.createReadStream('testfile.txt').pipe(writeStream);

    writeStream.on('error', function (err) {
      console.log('error saving ' + file.filename);
      return next(err); // early return on err
      // response.json({error: err});
    });

    writeStream.on('close', function (file) {
      // do something with 'file'
      console.log(file.filename + ' written To DB');
      response.json({filename: file.filename});
    });
});

router.get('/read', function(request, response, next) {

})

// Should add middleware if we end up using sentenceId a lot


module.exports = router;
