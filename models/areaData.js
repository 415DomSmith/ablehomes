var mongoose = require('mongoose');


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


// db.areaData.ensureIndex( { loc : "2dsphere" } ) //Creates an index of location data in issues collection.

var AreaData = mongoose.model('AreaData', areaDataSchema);

module.exports = AreaData;
