const passport = require ('passport');
const{Strategy} = require ('passport-local');
const debug =require ('debug')('app:localStrategy');
const {MongoClient} = require('mongodb');


module.exports= function localStrategy(){
passport.use(new Strategy({
    usernameField: 'username',
    passwordField: 'password'
}, (username, password, done)=>{
    const url = 'mongodb+srv://dbuser:passmongo@lecximantic.pssx7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const dbName ='lecximantic';
(async function addUser(){
    let client;
    try{
        client =await MongoClient.connect(url);
        debug('connected to the mongo DB');
        console.log('connected to the cloud db');

        const db =client.db(dbName);
        
        const user =await db.collection('users').findOne({username});
        if(user && user.password === password){
            console.log(user);
            done(null, user);
        } else {
            done(null, false)
        }

    }catch(error){
        done(error, false);
    }
    client.close();
    }())
}))
};