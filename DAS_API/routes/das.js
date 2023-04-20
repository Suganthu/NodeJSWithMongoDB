'use strict';
var express = require('express');
var router = express.Router();
var { mongoDBConnection } = require('../DatabaseConnection/databaseConfig')
const { MongoClient } = require("mongodb");
const ObjectID = require('mongodb').ObjectId;
const url = 'mongodb://zapp-dev-mum02.zoiftspl.com/';
const dbname = "DAS";
const tblTemplate = "Template";

/* GET users listing. */
router.get('/', async function (req, res) {

});

/* GET template list by name. */
router.get('/GetListByName', async function (req, res) {
    console.log(req.query);
    const client = new MongoClient(url);
    await client.connect();
    res.send(await selectOneList(client, req.query.value, tblTemplate));
});

/* GET template list by ID*/
router.get('/GetListByID', async function (req, res) {
    const client = new MongoClient(url);
    await client.connect();
    res.send(await selectByID(client, req.query.id, tblTemplate));
});

router.get('/GetAllTemplates', async function (req, res) {
    const client = new MongoClient(url);
    await client.connect();
    res.send(await selectMultipleList(client, tblTemplate));
});

/* POST - Insert templates */
router.post('/insertSingleTemplate', async function (req, res) {
    const client = new MongoClient(url);
    await client.connect();
    res.send(await insertListing(client, tblTemplate, req.body));
});

/* POST - Update template */
router.post('/updateSingleTemplate', async function (req, res) {
    const client = new MongoClient(url);
    await client.connect();
    res.send(await updateSingleCollection(client, tblTemplate, req.query.value, req.body));
});

async function dbConnection() {
    try {
        const client = new MongoClient(url);
        await client.connect();
        selectMultipleList(client, { isHR: 0, isTrainer: 1 });
        //selectOneList(client,'tony walter');

        // insertMultipleListing(client, [{
        //     name: 'tony walter',
        //     age: 23,
        //     dept: 'HR',
        //     role: {
        //         isSeniorDeveloper: 1,
        //         isHR: 1,
        //         isTrainer: 1
        //     }
        // }
        //     , {
        //     name: 'sailes patne',
        //     age: 23,
        //     dept: 'HR',
        //     role: {
        //         isSeniorDeveloper: 1,
        //         isHR: 1,
        //         isTrainer: 1
        //     }
        // }
        //     , {
        //     name: 'shammi patne',
        //     age: 23,
        //     dept: 'HR',
        //     role: {
        //         isSeniorDeveloper: 1,
        //         isHR: 1,
        //         isTrainer: 1
        //     }
        // }
        // ]);

        // insertListing(client, {
        //     name: 'sankar',
        //     age: 23,
        //     dept: 'Devlopment',
        //     role: {
        //         isSeniorDeveloper: 1,
        //         isHR: 0,
        //         isTrainer: 1
        //     }
        // });

        //listdatabases(client);
    }
    catch (e) {
        console.log('error in db connection : ', e);
    }
}

async function listdatabases(client) {
    const databaseList = await client.db().admin().listDatabases();
    databaseList.databases.forEach(element => {
        console.log(element.name);
    });
}

async function insertListing(client, tblName, newList) {
    try {

        const insertResult = await client.db(dbname).collection(tblName).insertOne(newList);
        return { status: 'S', message: 'Single template inserted successfully', data: insertResult };
    }
    catch (e) {
        return { status: 'F', message: 'Failed', data: e.message };
    }
}

async function updateSingleCollection(client, tblName, idOfListing, updatedListing) {
    try {

        const updateResult = await client.db(dbname).collection(tblName).updateOne({ _id: ObjectID(idOfListing) }
            , { $set: { updatedListing } });
        return { status: 'S', message: 'Single template updated successfully', data: updateResult };
    }
    catch (e) {
        return { status: 'F', message: 'Failed', data: e.message };
    }
}

async function insertMultipleListing(client, multipleNewList) {
    const resultOfMultipleListInsertion = await client.db(dbname).collection('DummyTemplates').insertMany(multipleNewList);
    console.log('Inserted multiple documents with ID : ', resultOfMultipleListInsertion);
}

async function selectOneList(client, nameOfListing, tblName) {
    return await client.db(dbname).collection(tblName).findOne({ TemplateName: nameOfListing });
}

async function selectByID(client, _id, tblName) {
    return await client.db(dbname).collection(tblName).findOne({ _id: ObjectID(_id) });
}

async function selectMultipleList(client, tblName) {
    return await client.db(dbname).collection(tblName).find({}).toArray();
}

module.exports = router;