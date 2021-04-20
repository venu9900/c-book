const mongoose=require('mongoose');

const placement=mongoose.model('placement',{
    _id:{
        type:String  
      },
    postImages:{
        type:Array
    },
    Count:{
        type:Array
    },
    Time:{
        type:Array
    },
    Date:{
        type:Array
    },
    Title:{
        type:Array
    },
    collegeName:{
        type:String
    },
    ProfileImage:{
        type:String
    },
    Filter:{
        type:String
    }
});


module.exports={placement};