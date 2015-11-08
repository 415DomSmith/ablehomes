var env = require("../config/environment")
	, validator = require("validator")
	, _ = require("underscore")
	, async = require('async')
	, logger = env.logger
;
var url=require('url');
//set datamodels based on datastoreMode

var listingModel = require("../models/listing")
module.exports.getListings = function(req, res) {
	var request = require('request');
	var queryparams=url.parse(req.url,false).query;
		var options = {
        uri : 'https://rets.io/api/v1/test/listings?access_token=6baca547742c6f96a6ff71b138424f21&limit=100&'+queryparams,
        method : 'GET'
    };
		console.log("URI: " + options.uri);
    var result = '';
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
        	result = JSON.parse(body);
        	for (var i=0;i<result.bundle.length;i++)
        	   {
        		console.log("Long lat :" + result.bundle[i].coordinates);
        		var ascore=0;
        		if(result.bundle[i].accessibilityFeatures!=null)
           			 {
           				 
           				 console.log("Accessibility Features:" + result.bundle[i].accessibilityFeatures);
           				 if(result.bundle[i].accessibilityFeatures.length==1)
           					 ascore=10;
           				 if(result.bundle[i].accessibilityFeatures.length==2)
           					 ascore=20;
           				 if(result.bundle[i].accessibilityFeatures.length==3)
           					 ascore=30;
           			 }
           			 var listing = {
            				    "listingId": result.bundle[i].id,
            				    "ascore": ascore
            				}
           			 console.log("Object to be inserted: "+ listing);
           			 listingModel.dbInsertListing(listing, function(error, successmessage) {
            				if (error) {
            					logger.error('Error from database in Inserting Listing. ' + error);
            					return res.send(500, env.errorMessages.code500);
            				}
            				console.log("Listing : " + successmessage);
            			});
           			result.bundle[i].ascore=ascore;
           			 
        	   }
        }
        else {
        	result = 'Not Found';
        }
        res.send(200,result);
    });
}

module.exports.getAreaData = function(req, res) {
    listingModel.getNearAreaData(function (error, data){
        if (error) {
            logger.error('Error from database in Inserting Listing. ' + error);
            return res.send(500, env.errorMessages.code500);
        } else {
            console.log(data);
            res.send(200, data);
        }
    });
};


var request = require("request");

var options = { method: 'GET',
  url: 'https://data.sfgov.org/resource/yr47-s4hb.json',
  headers: 
   {args: 'where=within_circle(location, 37.76, -122.42, 1000)',
     'x-app-token': 'JBMRiiAfhumWQ6HkheSjGcerh' } 
 };

request(options, function (error, response, body) {
  if (error) {
    return error;
  } else {
    console.log(body);
  }
});




