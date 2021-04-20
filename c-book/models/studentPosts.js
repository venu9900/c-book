const mongoose=require('mongoose');

const StudentPost=mongoose.model('StudentPost',{
    _id:{
        type:String
    },
    Name:{
        type:String
    },
    ProfileImage:{
        type:String
    },
    Label:{
        type:Array
    },
    Date:{
        type:Array
    },
    Time:{
        type:Array
    },
    Talents:{
        type:Array
    },
    Count:{
        type:Array
    }

});
module.exports={StudentPost}