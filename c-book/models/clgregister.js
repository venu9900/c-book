const mongoose = require('mongoose');

const CollegeRegister=mongoose.model('CollegeRegister',{
    _id:{
        type:String,
        require:true
    },
    collegeName:{
        type:String,
        require:true
    },
    collegeCode:{
        type:String,
        require:true
    },
    PrincipleId:{
        type:String,
        require:true
    },
    Password:{
        type:String,
        require:true
    },
    Flag:{
        type:String
    },
    ProfileImage:{
        type:String
    },
    PhoneNumber:{
        type:String
    }
});

module.exports={CollegeRegister}