var env = require("../config/environment")
	, validator = require("validator")
	, _ = require("underscore")
	, logger = env.logger
;

function dbInsertListing(listingObject, callback) {

	// Create object instance for mongoose
	var dbListingObject = new env.Listing(listingObject);
	
	// Because mongoose is an orm, we need to save the object instance
	dbListingObject.save(function(error, newListingObject) {
		if(error) {
			logger.error('Error from database inserting a listing.');
			return callback(error, null);
		}
		
		return callback(null, "Inserted Successfully");
	});
}
function getDbListing(listingId, callback) {
	env.Listing.findOne({ "listingId": listingId }, function(error, listingObject) {
		// log error from database, if so
		if(error) {
			logger.error('Error from database: ' + error);
			return callback(error);
		}
		// check if a null object is received
		if(validator.isNull(listingObject)) {
			logger.debug('Null object received from database, listingId: ' + listingId);
			return callback(null, null);
		}
		// Because mongo is an orm, it's doc needs to be converted to JS object
		listingObject = listingObject.toObject();
		//Return the information from database
		return callback(null, _.omit(listingObject, ['_id', '__v']));
 	});
}

function getNearAreaData(callback){
	env.AreaData.find({loc : { $near : { $geometry : { type : "Point", coordinates : [-122.4925437, 37.7518589] }, $maxDistance: 402}}
		}).exec(function (error, areaData) {
			if (error) {
				logger.error('Error from database: ' + error);
				return callback(error);
			} if(validator.isNull(areaData)) {
					logger.debug('Null object received from database');
					return callback(null, null);
			} else {
				var ramps = [];
				var busStops = [];

				areaData.forEach(function (e) {
					if (e.type === "bus_stop"){
						busStops.push(e);
					} else if (e.type === "curb_ramp"){
						ramps.push(e);
					}
				});
				// console.log("Number of bus stops in area: " + busStops.length + " and number of ramps in area: " + ramps.length);
				return {ramps: ramps.length, busStops: busStops.length};
			}
		});
}

function getStopsnRamps(box,callback){
	//var box = [req.query.NE, req.query.SW] //format req.query in to box of bounds    
	//var box = [ [-122.4925437, 37.7518589], [-122.5004402, 37.7477870]];
	env.AreaData.find({loc : { "$geoWithin" : {$box : box}}
		}).exec(function (error, areaData) {
			if (error) {
				logger.error('Error from database: ' + error);
				return callback(error);
			} if(validator.isNull(areaData)) {
					logger.debug('Null object received from database');
					return callback(null, null);
			} else {
				var ramps = [];
				var busStops = [];

				areaData.forEach(function (e) {
					if (e.type === "bus_stop"){
						busStops.push(e);
					} else if (e.type === "curb_ramp"){
						ramps.push(e);
					}
				});
				 console.log("Number of bus stops in area: " + busStops.length + " and number of ramps in area: " + ramps.length);
				return callback(null,{ramps: ramps, busStops: busStops});
			}
		});
}
var moduleExports = {};
moduleExports.dbInsertListing = dbInsertListing;
moduleExports.getDbListing = getDbListing;
moduleExports.getNearAreaData = getNearAreaData;
moduleExports.getStopsnRamps= getStopsnRamps;
module.exports = moduleExports;