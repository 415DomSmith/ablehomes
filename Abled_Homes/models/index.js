var mongoose = require('mongoose');
mongoose.connect( 'mongodb:ablehome:admin@ds049624.mongolab.com:49624/ablehomes');


mongoose.set('debug', true);


module.exports.Agent = require('./agent');
module.exports.Client = require('./client');
module.exports.Listing = require('./listing');
module.exports.areaData = require('./areaData');

