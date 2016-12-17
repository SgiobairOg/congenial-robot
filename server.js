// server.js

// congenial robot
// Jason Wilson - jason@wilsons.io

// Server setup to receive emails from the USCG Notice to Mariners list for
// eventual processing into useful geo-referenced data streams.

var express = require('express');
var port = process.env.PORT || '8080';
var mail = process.env.CLOUDMAILIN_FORWARD_ADDRESS || 'Unset';

const util = require('util');

var server = express();

// Logging middleware
server.use( function timestamp ( req, res, next ) {
  console.log( `Time: ${ Date.now() }` );
  next();
});

// Incoming mail route
server.post( '/brow', function( req, res ) {
  
  console.log(util.inspect(req.body, { showHidden: true, depth: null }));
  
  var parsedHeaders = req.headers;
  
  console.log( `From: ${parsedHeaders['From']}` );
  console.log( `Subject: ${parsedHeaders['Subject']}` );
  
  res.status(200).send( "Message received." );
  
});

// Listen up
server.listen( port );

console.log(`Server is awaiting mail on port: ${ port }`);
console.log(`Incoming mail on ${ mail }`);