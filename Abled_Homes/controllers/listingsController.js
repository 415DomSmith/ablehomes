var env = require("../config/environment")
	, validator = require("validator")
	, _ = require("underscore")
	, async = require('async')
	, logger = env.logger
;

//set datamodels based on datastoreMode


module.exports.getListings = function(req, res) {
	var vendor = req.params.vendor;
  var request = require('request');
function get_listing(trust_you_id,vendor,callback) {
    var userId = vendor;
		var options = {
        uri : 'https://rets.io/api/v1/test/listings?access_token=6baca547742c6f96a6ff71b138424f21',
        method : 'GET'
    };
		console.log("URI: " + options.uri);
    var res = '';
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res = body;
        }
        else {
            res = 'Not Found';
        }
        callback(res);
    });
}

get_listing("abcxyz",'vendor', function(resp){
    console.log(resp);
		return res.send(200, resp);
});
}



/*module.exports.getCategories = function(req, res) {
	categoryModel.dbGetCategories(function(error, categories) {
		if (error) {
			logger.error('Error from database: ' + error);
			return res.send(500, env.errorMessages.code500);
		}
		if (validator.isNull(categories)) {
			logger.debug('Null object received in get category controller');
			return res.send(404, env.errorMessages.code404);

		}
		return res.send(200, categories);
	}); */
