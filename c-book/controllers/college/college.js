const express=require('express');
var router=express.Router();
const accessTokenSecret = 'somerandomaccesstoken';
const refreshTokenSecret = 'somerandomstringforrefreshtoken';

const jwt = require("jsonwebtoken")
const jwtHelper=require('../../config/jwtHelper')

const {CollegeRegister}=require('../../models/clgregister')

router.post('/register',(req,res,next)=>{
    let college=new CollegeRegister({
       _id:req.body.CollegeEmail,
       collegeName:req.body.collegeName,
       collegeCode:req.body.collegeCode,
       PrincipleId:req.body.PrincipleId,
       Password:req.body.Password,
       ProfileImage:'assets\\uploads\\profile\\demo.png',
       PhoneNumber:req.body.PhoneNumber,
       Flag:"0"
    });
    CollegeRegister.findOne({
        _id:req.body.CollegeEmail
    }).then(clg=>{
        if(!clg){
            CollegeRegister.create(college)
            .then(clgs=>{
                return res.json({msg:clgs._id+'Registered Successfully',status:true})
            });
        }else{
            return res.json({msg:'User Already Exists With'+_id+' Email',status:false})
         }
 
     })
     .catch(err=>{
        return res.json({msg:'User Already Exists With '+ req.body.CollegeEmail+' EmailId',status:false})
     })
});

router.post('/login',(req,res,next)=>{
    CollegeRegister.findOne({
        _id:req.body.EmailId
    })
    .then(clg=>{
        if(clg){
            if(clg.Flag!=0){
                if(req.body.Password==clg.Password){
                    const token = jwt.sign({email:clg.id,category:'college'},accessTokenSecret);
                    // const refreshToken = jwt.sign({ username: user.username, role: user.role }, refreshTokenSecret);
                    // return res.json({token:token})
                    return res.json({msg:'done',status:true,token:token});
                }
                else{
                    return res.json({msg:'Wrong Password'});
                }
            }
            else{
                return res.json({msg:'You Are Not Yet Confirmed By Your College Authority'});
            }
        }else{
            return res.json({msg:'Check With Your EmailId'});
        }
    });
});
module.exports=router;