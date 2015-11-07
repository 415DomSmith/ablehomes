var env = require("../config/environment")
	, validator = require("validator")
	, _ = require("underscore")
	, async = require('async')
	, logger = env.logger
;

//set datamodels based on datastoreMode
// var productModel = require("../models/productModel")

// module.exports.postProduct = function(req, res) {
// 	if (_.isEmpty(req.body)) {
// 		logger.log("Empty request body received in POST product.");
// 		return res.send(400, env.errorMessages.code400);
// 	}
// 	productModel.dbCreateProduct(req.body, function(error, newProduct) {
// 		if (error) {
// 			logger.error('Error from database in POST product. ' + error);
// 			return res.send(500, env.errorMessages.code500);
// 		}
// 		if (validator.isNull(newProduct)) {
// 			logger.debug('Null object received from database in POST product. ');
// 			return res.send(400, env.errorMessages.code400);
// 		}
// 		return res.send(200, newProduct);
// 	});
// }

// module.exports.getProduct = function(req, res) {
// 	var productId = req.params.product_id;
// 	productModel.dbGetProduct(productId, function(error, product) {
// 		if (error) {
// 			logger.error('Error from database: ' + error);
// 			return res.send(500, env.errorMessages.code500);
// 		}
// 		if (validator.isNull(product)) {
// 			logger.debug('Null object received in get Product controller, productId: ' + productId);
// 			return res.send(404, env.errorMessages.code404);

// 		}
// 		return res.send(200, product);
// 	});
// }

// module.exports.getProducts = function(req, res) {
// 	var categoryId = req.params.category_id;
// 	console.log(categoryId);
// 	productModel.dbGetProducts(categoryId, function(error, products) {
// 		if (error) {
// 			logger.error('Error from database: ' + error);
// 			return res.send(500, env.errorMessages.code500);
// 		}
// 		if (validator.isNull(products)) {
// 			logger.debug('Null object received in get product controller');
// 			return res.send(404, env.errorMessages.code404);

// 		}
// 		return res.send(200, products);
// 	});
// }

// module.exports.putProduct = function(req, res) {
// 	if (_.isEmpty(req.body)) {
// 		logger.log("Empty request body received in PUT product.");
// 		return res.send(400, env.errorMessages.code400);
// 	}
// 	var productId = req.params.product_id;
// 	productModel.dbUpdateProduct(productId,req.body, function(error, product) {
// 		if (error) {
// 			logger.error('Error from database in PUT product. ' + error);
// 			return res.send(500, env.errorMessages.code500);
// 		}
// 		if (validator.isNull(product)) {
// 			logger.debug('Null object received from database in PUT product. ');
// 			return res.send(400, env.errorMessages.code400);
// 		}
// 		return res.send(200, product);
// 	});
// }

// module.exports.deleteProduct = function(req, res) {
// 	var productId = req.params.product_id;
// 	productModel.dbDeleteProduct(productId, function(error, product) {
// 		if (error) {
// 			logger.error('Error from database: ' + error);
// 			return res.send(500, env.errorMessages.code500);
// 		}
// 		if (validator.isNull(product)) {
// 			logger.debug('Null object received in get Product controller, productId: ' + productId);
// 			return res.send(404, env.errorMessages.code404);

// 		}
// 		return res.send(200,null);
// 	});
// }
