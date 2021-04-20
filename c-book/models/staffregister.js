const mongoose = require('mongoose');

const StaffRegister=mongoose.model('StaffRegister',{
    collegeName:{
        type:String
    },
    collegeCode:{
        type:String
    },
    Name:{
        type:String
    },
    PhoneNumber:{
        type:String
    },
    _id:{
      type:String  
    },
    Password:{
        type:String
    },
    Flag:{
        type:String
    },
    ProfileImage:{
        type:String
    }
});

module.exports={StaffRegister};
