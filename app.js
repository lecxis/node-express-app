const express = require('express');
const chalk = require('chalk');
const debug = require ('debug')('app');
const morgan =require ('morgan');
const path =require('path');
const passport= require ('passport');
const cookieParser= require ('cookie-parser');
const session = require ('express-session');

//npm install passport@0.4 express-session@:1.17 cookie-parser@1.4


const PORT = process.env.PORT || 3000;
const app = express();
const sessionsRouter = require( './src/routers/sessionsRouter');
const adminRouter = require( './src/routers/adminRouter');
//const authRouter = require('./src/routers/authRouter');
 const authRouter = require ('./src/routers/authRouter');
app.use(morgan ('tiny'));
app.use(express.static(path.join(__dirname, '/public/'))); //this willn look for an index file
//in public folder. if it does not find one it proceeds to line 13  
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({secret: 'lecximantics'}));

require('./src/config/passport.js')(app)


app.use('/sessions', sessionsRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.get('/', (req, res)=>{
   // res.send('Hello from here')
   res.render('index', {title:'Globomantics', data:['a','b','c']})
})

app.listen(PORT, ()=>{
    debug(`App is live on ${chalk.green(PORT)}` );
})