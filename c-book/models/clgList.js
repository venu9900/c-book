const mongoose=require('mongoose');

const ClgList=mongoose.model('ClgList',{
    _id:{
        type:String
    },
    clgName:{
        type:Array
    },
    clgCode:{
        type:Array
    }
})
module.exports={ClgList}