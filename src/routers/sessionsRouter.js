const express = require('express');
const debug = require('debug')('app:sessionRouter')
const {MongoClient, ObjectID} = require('mongodb');
const sessionsRouter =express.Router();
const sessions = require ('../data/sessions.json');


sessionsRouter.route('/').get((req, res) =>{
  const url = 'mongodb+srv://dbuser:passmongo@lecximantic.pssx7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const dbName ='lecximantic';
(async function mongo(){
let client;
try{
    client =await MongoClient.connect(url);
    debug('connected to the mongo DB');
    console.log('connected to the cloud db');

    const db =client.db(dbName);
    console.log('name is in');
    const sessions =await db.collection('sessions').find().toArray();
   //  console.log(sessions);
    res.render('sessions', {sessions})
}catch(error){
    debug(error.stack);
}
client.close();
}())
    
})


  sessionsRouter.route('/:id').get((req, res) =>{
    const Id = req.params.id;
  const url = 'mongodb+srv://dbuser:passmongo@lecximantic.pssx7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const dbName ='lecximantic';
(async function mongo(){
let client;
try{
    client =await MongoClient.connect(url);
    debug('connected to the mongo DB');
    console.log('connected to the cloud db');

    const db =client.db(dbName);
    console.log('name is in');
    const session =await db.collection('sessions').findOne({_id: new ObjectID(Id)});
   //  console.log(sessions);
    res.render('session', {session})
}catch(error){
    debug(error.stack);
}
client.close();
}())
    
})



module.exports=sessionsRouter;

/* 
// passmongo 
mongodb+srv://dbuser:passmongo@lecximantic.pssx7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority


const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://dbuser:<password>@lecximantic.pssx7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


*/