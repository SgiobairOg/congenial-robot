// server.js

// congenial robot
// Jason Wilson - jason@wilsons.io

// Server setup to receive emails from the USCG Notice to Mariners list for
// eventual processing into useful geo-referenced data streams.

var express = require('express');
var bodyParser = require( 'body-parser' );
var methodOverride = require( 'method-override' );

const port = process.env.PORT || '8080';
const mail = process.env.CLOUDMAILIN_FORWARD_ADDRESS || 'Unset';

var server = express();

// get all data of body (POST) parameters
//  parse application/json
server.use( bodyParser.json() );

//  parse application/vdn.api+json as json
server.use( bodyParser.json( { type: 'application/vnd.api+json' } ) );

//  parse application/x-www-form-urlencoded
server.use( bodyParser.urlencoded( { extended: true } ) );

// Logging middleware
server.use( function timestamp ( req, res, next ) {
  console.log( `Time: ${ Date.now() }` );
  next();
});

// Incoming mail route
server.post( '/brow', function( req, res ) {
  
  var parsedHeaders = req.body.headers;
  
  console.log( `From: ${parsedHeaders['From']}` );
  console.log( `Subject: ${parsedHeaders['Subject']}` );
  
  res.status(200).send( `Message received from: ${parsedHeaders['From']}.` );
  
});

// Listen up
server.listen( port );

console.log(`Server is awaiting mail on port: ${ port }`);
console.log(`Incoming mail on ${ mail }`);