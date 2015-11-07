
var listingsController = require('../../controllers/listingsController')
	, baseurl = '/abledhomes/v1';
module.exports = function(app, env) {
	app.get(baseurl + '/listings/:vendor', listingsController.getListings);
//	app.post(baseurl + '/category/:category_id/product', productController.postProduct);
//	app.get(baseurl + '/category/:category_id/product/:product_id', productController.getProduct);
//	app.put(baseurl + '/category/:category_id/product/:product_id', productController.putProduct);
//	app.delete(baseurl + '/category/:category_id/product/:product_id', productController.deleteProduct);


}
