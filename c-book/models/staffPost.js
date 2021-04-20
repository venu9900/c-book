const mongoose=require('mongoose');

const StaffPost=mongoose.model('StaffPost',{
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
    PDFPath:{
        type:Array
    },
    Count:{
        type:Array
    }

});
module.exports={StaffPost}