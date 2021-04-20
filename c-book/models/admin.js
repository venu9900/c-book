const mongoose=require('mongoose');

const Admin=mongoose.model('Admin',{
    _id:{
        type:String
    },
    Password:{
        type:String
    }
});
module.exports={Admin}