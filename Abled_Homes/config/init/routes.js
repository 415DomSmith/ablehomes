/*

	Set all routes of the freedoor application

*/

var userController = require('../../controllers/userController')
	, categoryController = require('../../controllers/categoryController')
	, productController=require('../../controllers/productController')
	, baseurl = '/freedoor/v1'
;

module.exports = function(app, env) {
	//set all the routes for freedoor application
	
	// User routes
	app.post(baseurl + '/users', userController.postUser);
	app.get(baseurl + '/users/:user_id', userController.getUser);
	
	// Category routes
	app.post(baseurl + '/category', categoryController.postCategory);
	app.get(baseurl + '/category/:category_id', categoryController.getCategory);
	app.get(baseurl + '/category', categoryController.getCategories);
	
	
	//Products routes
	app.get(baseurl + '/category/:category_id/product', productController.getProducts);
	app.post(baseurl + '/category/:category_id/product', productController.postProduct);
	app.get(baseurl + '/category/:category_id/product/:product_id', productController.getProduct);
	app.put(baseurl + '/category/:category_id/product/:product_id', productController.putProduct);
	app.delete(baseurl + '/category/:category_id/product/:product_id', productController.deleteProduct);
	

}