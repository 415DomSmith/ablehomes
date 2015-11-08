var env = require("../config/environment")
  , validator = require("validator")
  , _ = require("underscore")
  , async = require('async')
  , logger = env.logger
;
var url=require('url');
var retslyResults=null;
//set datamodels based on datastoreMode

var listingModel = require("../models/listing")
module.exports.getListings = function(req, res) {
  var request = require('request');
  var queryparams=url.parse(req.url,false).query;
  if(queryparams!=null)
  var urm = 'https://rets.io/api/v1/test/listings?access_token=6baca547742c6f96a6ff71b138424f21&limit=100&'+queryparams;
  else {
    urm = 'https://rets.io/api/v1/test/listings?access_token=6baca547742c6f96a6ff71b138424f21&limit=100';
  }
  var options = {
        uri : urm,
        method : 'GET'
    };
    console.log("URI: " + options.uri);
    var result = '';
    request(options, function (error, response, body) {
      if(error){
        logger.error('Error Getting Retsly Data ' + error);
      }
        if (!error && response.statusCode == 200) {
          result = JSON.parse(body);
          retslyResults=result;''
          for (var i=0;i<retslyResults.bundle.length;i++)
            {

                var ascore=0;
                    if(retslyResults.bundle[i].accessibilityFeatures!=null)
                    {

                        console.log("Accessibility Features:" + retslyResults.bundle[i].accessibilityFeatures);
                        if(retslyResults.bundle[i].accessibilityFeatures.length==1)
                          ascore+=10;
                        if(retslyResults.bundle[i].accessibilityFeatures.length==2)
                          ascore+=20;
                        if(retslyResults.bundle[i].accessibilityFeatures.length==3)
                          ascore+=30;
                     }

                    if(retslyResults.bundle[i].stories<2)
                        ascore+=5;
                    if(retslyResults.bundle[i].yearBuilt>1990)
                        ascore+=5;

                    retslyResults.bundle[i].ascore=ascore;
                    listingModel.getNearAreaData([-122.4194160, 37.7749290], function (error, data){
                        if (error) {
                            logger.error('Error from database in Inserting Listing. ' + error);
                        } else {
                            console.log(data);
                            ascore+=data.ramps/50;
                            ascore+=data.busStops/3;
                            ascore*= 3.5;
                        } });
            }
          res.send(200,retslyResults);

        }
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
module.exports.getOneListing = function(req, res) {
  var request = require('request');
  var listingId=req.params.listingId;
  console.log("Listing ID  " + listingId);
    var options = {
        uri : 'https://rets.io/api/v1/test/listings/'+listingId+'?access_token=6baca547742c6f96a6ff71b138424f21&limit=1',
        method : 'GET'
    };
    var result = '';
    request(options, function (error, response, body) {
      if(error){
        logger.error('Error Getting Retsly Data ' + error);
      }
        if (!error && response.statusCode == 200) {
          console.log("Response: " + body);
          result = JSON.parse(body);
          return res.send(200, result);

        }
});
    console.log("URI: " + options.uri);
}
