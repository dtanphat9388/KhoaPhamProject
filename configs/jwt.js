const jwt = require('jsonwebtoken');

const secretKey = "gfdsgfsg";

const config = {};

function sign( obj, cb ) {
   jwt.sign( obj, secretKey, config, ( err, encoded) => cb( err, encoded ));
}

function verify( str, cb ) {
   jwt.verify( str, secretKey, ( err, decoded ) => cb( err, decoded))
}


module.exports = { sign, verify };
