const express= require('express');
const bodyParser= require('body-parser');
const jwtHelper =require( './config/jwtHelper');
const  jwt=require('jsonwebtoken');

var cors=require('cors');
var app=express();

const { mongoose }=require('./db');
var studregister=require('./controllers/student/studregister');
var staffregister=require('./controllers/staff/staffregister');
var homePage=require('./controllers/home/homePage');
var college=require('./controllers/college/college');
var admin=require('./controllers/admin')

app.use(bodyParser.json());
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
app.use(bodyParser.urlencoded({extended: true}));
app.use('/uploads/',express.static('uploads'))
app.use(cors({origin:'http://localhost:4200'}));//for multiple requests and it allows  request from any port number or domain

app.listen(3000,()=>
{
    console.log('Server Started at port: 3000')
});

app.use('/student',studregister);
app.use('/staff',staffregister);
app.use('/home',homePage);
app.use('/college',college);
app.use('/admin',admin);
