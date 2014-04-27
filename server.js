// Module dependencies

var application_root = __dirname,
  express = require('express'), // Web framework
  path = require ('path'), // Utilities for dealind with file paths
  mongoose = require('mongoose'); // MongoDB integration

// Config (for later)
// var config = require( './config/config')();

// Create server
var app = express();

// Configure server
app.configure( function() {

  // parses request body and populates request.body
  app.use( express.bodyParser() );

  // checks request.body for HTTP method overrides
  app.use( express.methodOverride() );

  // perform route lookup based on url and HTTP method
  app.use( app.router );

  // Where to serve static content
  app.use( express.static( path.join ( application_root, '/site' ) ) );

  // Show all errors in development
  app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));

});

// Start server

var port = 4711;
app.listen( port, function() {
  console.log( 'Express server listening on port %d in %s mode', port, app.settings.env);
});

// Routes

/*
  Note: do NOT use a get for the index.html page, just the api stuff
*/

app.get( '/api', function (request, response) {
  response.send( 'Our API is running' );
});

// Connect to the database
mongoose.connect('mongodb://localhost/workshop_database');

// Schemas
var BeforeIDie = new mongoose.Schema({
  todo: String,
  createDate: Date,
  modifiedDate: Date
});

var BeforeIDieModel = mongoose.model( 'BeforeIDie', BeforeIDie);

// Get a list of all before I die "todos"
app.get( '/api/befores', function (request, response) {
  return BeforeIDieModel.find( function ( err, beforeidie) {
    if ( !err) {
      return response.send( beforeidie );
    } else {
      return console.log(err);
    }
  });
});

// Insert a new "before i die" todo
app.post ( '/api/befores', function ( request, response ) {
  var beforeidie = new BeforeIDieModel({
    todo: request.body.todo,
    createDate: request.body.createDate,
    modifiedDate: request.body.modifiedDate
  });

  return beforeidie.save( function ( err ) {
    if ( !err ) {
      console.log( 'created' );
      return response.send( beforeidie );
    } else {
      console.log( err );
    }
  });
});

/* 
* TO TEST (in console in Chrome)
*
jQuery.post( '/api/befores', {
    'todo': 'JavaScript the good parts',
    'createDate': new Date( 2014, 4, 27 ).getTime(),
    'modifiedDate': new Date( 2014, 4, 27 ).getTime(),
}, function(data, textStatus, jqXHR) {
    console.log( 'Post response:' );
    console.dir( data );
    console.log( textStatus );
    console.dir( jqXHR );
});
*/ 

