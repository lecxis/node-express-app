const express = require('express');
const debug = require('debug')('app:adminRouter')
const {MongoClient} = require('mongodb');
const sessions = require ('../data/sessions.json');

const adminRouter =express.Router();

adminRouter.route('/').get((req, res) =>{
const url = 'mongodb+srv://dbuser:passmongo@lecximantic.pssx7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const dbName ='lecximantic';
(async function mongo(){
let client;
try{
    client =await MongoClient.connect(url);
    debug('connected to the mongo DB');
    console.log('connected to the cloud db');

    const db =client.db(dbName);
    const response =await db.collection('sessions').insertMany(sessions);
    //console.log(response);
    res.json(response)
}catch(error){
    debug(error.stack);
}
}())

});

 

module.exports=adminRouter;