var mongoose = require('mongoose');


var listingSchema = new mongoose.Schema({

	loc 							: {type: [Number], coordinates: [], index: '2dsphere'},
	lat 							: {type: Number, required: true},
	long 							: {type: Number, required: true},
	address 					: {type: String, required: true},
	city 							: String,
	state 						: String,
  image             : String,
  price             : Number,
  stories           : Number,
  yearBuilt         : Number,
  exteriorFeatures  : [],
  accessibilityFeatures: [],
	dateCreated 			: {type: Date, default: Date.now},
	agent: {
		type 						: mongoose.Schema.Types.ObjectId,
		ref 						: 'Agent'
	}
});

listingSchema.index({loc: '2dsphere'});


// db.listing.ensureIndex( { loc : "2dsphere" } ) //Creates an index of location data in listing collection.

var Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
