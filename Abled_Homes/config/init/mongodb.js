/*
 *	Mongo db set up file for freedoor
 *
 */

var mongoose = require('mongoose')
	, schema = require('mongoose').Schema
;

// Agent Schema
var agentSchema = new mongoose.Schema({

    email       : {
                    type: String,
                    required: true,
                    unique: true
                },
    password    : String,
    phone       : Number,
    listings    : [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Listing'
                }],
    clients     : [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Client'
                }]
});

var areaDataSchema = new mongoose.Schema({

	loc 							: {type: [Number], coordinates: [], index: '2dsphere'},
	lat 							: {type: Number, required: true},
	long 							: {type: Number, required: true},
	name							: String,    			
	address 					: {type: String, required: true},
	city 							: String,
	state 						: String,
  type             	: String,
  accessibilityFeatures: [],
});

areaDataSchema.index({loc: '2dsphere'});


var clientSchema = new mongoose.Schema({

    email       : {
                    type: String,
                    required: true,
                    unique: true
                },
    password    : String,
    phone       : Number,
    listings    : [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Listing'
                }],
    agents     : [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Agent'
                }]
});

var listingSchema = new mongoose.Schema({

	listingId							: {type: String, required: true},
	ascore 						: {type: Number, required: true}
});



var categorySchema = new schema({}, { strict: false });
var productSchema = new schema({}, { strict: false});

module.exports = function(app, env) {
	// mongoose gives default pool of 100 connections
	var mongoUrl = env.config.mongo.url;
	env.db = mongoose.connect(mongoUrl);
	env.Agent = mongoose.model('Agent', agentSchema);
	env.AreaData = mongoose.model('AreaData', areaDataSchema);
	env.Client = mongoose.model('Client', clientSchema);
	env.Listing = mongoose.model('Listing', listingSchema);
}
