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
		return callback(null, _.omit(listingObject, ['_id', '__v']),result);
 	});
}
moduleExports = {}
moduleExports.dbInsertListing = dbInsertListing;
moduleExports.getDbListing = getDbListing;
module.exports = moduleExports;