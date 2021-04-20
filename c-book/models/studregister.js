const mongoose= require('mongoose');

const StudentRegister=mongoose.model('StudentRegister',{
    collegeName:{
        type:String,
    },
    Usn:{
        type:String,
    },
    Name:{
        type:String,
    },
    PhoneNumber:{
        type:String,
    },
    _id:{
        type:String,
    },
    Password:{
        type:String,
    },
    Flag:{
        type:String
    },
    collegeCode:{
        type:String
    },
    ProfileImage:{
        type:String
    }
});
module.exports={StudentRegister};