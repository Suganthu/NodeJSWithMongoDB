'use strict';
var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://zapp-dev-mum02.zoiftspl.com";
var databaseName = "DAS";

/* Connect the MongoDB with node - Sankar */

const mongoDBConnection = mongoClient.connect(url, function (err, db) {
    try {
        console.log('before try')
        debugger;
        var dbo = db.db(databaseName);
        dbo.collection("Template").findOne({}, function (err, result) {
            //console.log(result.name);
            db.close();
        });
        
        console.log('end try')
    }
    catch (err) {
        console.log(err.message);
    }

});

module.exports = {
    mongoDBConnection,mongoClient, 
}



