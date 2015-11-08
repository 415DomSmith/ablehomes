
var listingsController = require('../../controllers/listingsController')
	, baseurl = '/abledhomes/v1';
module.exports = function(app, env) {
	app.get(baseurl + '/listings', listingsController.getListings);
	app.get(baseurl + '/listings/areaData', listingsController.getAreaData);
//	app.post(baseurl + '/category/:category_id/product', productController.postProduct);
//	app.get(baseurl + '/category/:category_id/product/:product_id', productController.getProduct);
//	app.put(baseurl + '/category/:category_id/product/:product_id', productController.putProduct);
//	app.delete(baseurl + '/category/:category_id/product/:product_id', productController.deleteProduct);


};
