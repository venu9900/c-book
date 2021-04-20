const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/c-book',{useNewUrlParser:true},(err)=>{
    if(!err)
        console.log('Mongodb Connection Succeeded');
    else
        console.log('Error in db connection'+JSON.stringify(err,undefined,2));
});

module.exports={mongoose};

require('./models/studregister')