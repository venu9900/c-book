const express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
const jwtHelper=require('../../config/jwtHelper')
const jwt=require('jsonwebtoken');

const {StudentRegister}= require('../../models/studregister.js');
const accessTokenSecret = 'somerandomaccesstoken';
const refreshTokenSecret = 'somerandomstringforrefreshtoken';


  router.post('/register', (req, res, next)=> {
      var clgCode=req.body.Usn;
      clgCode=clgCode.substring(0,3);
    let student=new StudentRegister({
        collegeName:req.body.collegeName,
        Usn:req.body.Usn,
        PhoneNumber:req.body.PhoneNumber,
        Name:req.body.Name,
        _id:req.body.EmailId,
        Password:req.body.Password,
        collegeCode:clgCode.toUpperCase(),
        ProfileImage:'assets\\uploads\\profile\\demo.png',
        Flag:0
    });
    StudentRegister.findOne({
        _id:req.body.EmailId
    }).then(students=>{
        if(!students){
            StudentRegister.create(student)
            .then(stud=>{
               return res.json({msg:student._id+' Registered Successfully',status:'true'})
            })
        }else{
           return res.json({msg:'User Already Exists With '+_id+' Email',status:false})
        }
    })
    .catch(err=>{
        return res.json({msg:'User Already Exists With '+ req.body.EmailId+' EmailId',status:false})
    })  
});

router.post('/login',(req,res,next)=>{
    StudentRegister.findOne({
        _id:req.body.EmailId
    })
    .then(stud=>{
        if(stud){
            if(stud.Flag!=0){
                if(req.body.Password==stud.Password){
                    const token = jwt.sign({email:stud.id,category:'student'},accessTokenSecret);
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
