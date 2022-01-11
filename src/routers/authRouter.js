const express = require('express');
const res = require('express/lib/response');
const debug = require('debug')('app:authRouter')
const {MongoClient, ObjectID} = require('mongodb');
//const passport = require('../config/passport');
const passport = require('passport');
const authRouter = express.Router();

authRouter.route('/signUp').post((req, res)=>{
    // create user
    const {username, password}=req.body;
    const url = 'mongodb+srv://dbuser:passmongo@lecximantic.pssx7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const dbName ='lecximantic';
(async function addUser(){
    let client;
    try{
        client =await MongoClient.connect(url);
        debug('connected to the mongo DB');
        console.log('connected to the cloud db');

        const db =client.db(dbName);
        const user= {username, password};
        const results= await db.collection('users').insertOne(user);
        debug(user);
        req.login(results.ops[0], ()=>{
            res.redirect('/auth/profile');
        })
        //const response =await db.collection('sessions').insertMany(sessions);

    }catch(error){
        debug(error);
    }
    client.close();
    }())

    
})

authRouter.route('/signIn').get((req, res)=>{
    res.render('signin');
})
.post(passport.authenticate('local',{
        successRedirect: '/auth/profile',
        failureMessage: '/',
    })
)

authRouter.route('/profile').get((req, res)=>{
    res.json(req.user);
})
module.exports= authRouter;