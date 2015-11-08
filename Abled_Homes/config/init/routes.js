
var listingsController = require('../../controllers/listingsController')
	, baseurl = '/abledhomes/v1';
module.exports = function(app, env) {
	app.get(baseurl + '/listings', listingsController.getListings);
	app.get(baseurl + '/listings/areaData', listingsController.getAreaData);
	app.get(baseurl + '/listings/:listingId', listingsController.getOneListing);


};
