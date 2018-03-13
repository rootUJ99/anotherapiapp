const express = require('express');
const parseurl=require('parseurl');
const bodyParser= require('body-parser');
const path= require('path');
const expressValidator=require('express-validator');
const mongoose=require('mongoose');
const Signature= require('./models/schema');
const app=express();
const url=process.env.MONGOLAB_URI;

mongoose.connect(url,(err,db)=>{
    if(err){
        console.log('unable to connect to database '+err);
    }
    else{
        console.log('connected to database '+url);
    }
});

//home
app.get('/',(req,res)=>{
    res.json('you did it');
});

//Signatures

app.get('/api/signatures',(req,res)=>{
    Signature.find({}).then(eachOne=>{
        res.json(eachOne);
    })
})

//post request

app.post('api/signatures',(req,res)=>{
    Signature.create({
        guestSignature:req.body.SignatureOfGuest,
        message:req.body.MessageofGuest,
    }).then(signature=>{
        res.json(signature);
    });
});

app.listen(process.env.PORT || 3000,()=>{
    console.log('server started at 3000');
})