/*
 *  http handlers for user objects
 */

var env = require("../config/environment")
	, validator = require("validator")
	, _ = require("underscore")
	, async = require('async')
	, logger = env.logger
;

//set datamodels based on datastoreMode
var userModel = require("../models/userModel")

module.exports.postUser = function(req, res) {
	if (_.isEmpty(req.body)) {
		logger.log("Empty request body received in POST user.");
		return res.send(400, env.errorMessages.code400);
	}
	userModel.dbCreateUser(req.body, function(error, newUser) {
		if (error) {
			logger.error('Error from database in POST user. ' + error);
			return res.send(500, env.errorMessages.code500);
		}
		if (validator.isNull(newUser)) {
			logger.debug('Null object received from database in POST user. ');
			return res.send(400, env.errorMessages.code400);
		}
		return res.send(200, newUser);
	});
}

module.exports.getUser = function(req, res) {
	var userId = req.params.user_id;
	userModel.dbGetUser(userId, function(error, user) {
		if (error) {
			logger.error('Error from database: ' + error);
			return res.send(500, env.errorMessages.code500);
		}
		if (validator.isNull(user)) {
			logger.debug('Null object received in get User controller, userId: ' + userId);
			return res.send(404, env.errorMessages.code404);

		}
		return res.send(200, user);
	});
}