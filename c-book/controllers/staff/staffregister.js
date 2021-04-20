const express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
const jwtHelper=require('../../config/jwtHelper')
const jwt=require('jsonwebtoken');


const {StaffRegister}=require('../../models/staffregister');

const accessTokenSecret = 'somerandomaccesstoken';
const refreshTokenSecret = 'somerandomstringforrefreshtoken';


router.post('/register',(req,res,next)=>{
    console.log(req.body.Name)
    let Staff=new StaffRegister({
        collegeCode:req.body.collegeCode.toUpperCase(),
        collegeName:req.body.collegeName,
        Name:req.body.Name,
        PhoneNumber:req.body.PhoneNumber,
        _id:req.body.EmailId,
        Password:req.body.Password,
        ProfileImage:'assets\\uploads\\profile\\demo.png',
        Flag:0
    });
    StaffRegister.findOne({
        _id:req.body.EmailId
    }).then(staffs=>{
        if(!staffs){
            StaffRegister.create(Staff)
            .then(staff=>{
               return res.json({msg:staff._id+'Registered Successfully',status:true})
            })
        }else{
           return res.json({msg:'User Already Exists With'+_id+' Email',status:false})
        }
    })
    .catch(err=>{
       return res.json({msg:'User Already Exists With '+ req.body.EmailId+' EmailId',status:false})
    })  
});

router.post('/login',(req,res,next)=>{
    StaffRegister.findOne({
        _id:req.body.EmailId
    })
    .then(staff=>{
        if(staff){
            if(staff.Flag!=0){
                if(req.body.Password==staff.Password){
                    const token = jwt.sign({email:staff.id,category:'staff'},accessTokenSecret);
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