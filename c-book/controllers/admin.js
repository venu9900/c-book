const express=require('express');
var router=express.Router();
const accessTokenSecret = 'somerandomaccesstoken';
const refreshTokenSecret = 'somerandomstringforrefreshtoken';

const jwt = require("jsonwebtoken")
const jwtHelper=require('../config/jwtHelper')

//Arrays To send data
Names=[];Emails=[];PhoneNumbers=[];profiles=[];collegeCodes=[];

//Models of Different Category
const {CollegeRegister} =require('../models/clgregister')
const {StudentRegister} =require('../models/studregister')
const {StaffRegister} =require('../models/staffregister')
const {post}=require('../models/posts')
const {Admin} =require('../models/admin')
const {ClgList} =require('../models/clgList');
const clgList = require('../models/clgList');

router.post('/login',(req,res,next)=>{
    Admin.findOne({
        _id:req.body.EmailId
    })
    .then(admin=>{
        if(admin){
                if(req.body.Password==admin.Password){
                    const token = jwt.sign({email:admin._id,category:'admin'},accessTokenSecret);
                    // const refreshToken = jwt.sign({ username: user.username, role: user.role }, refreshTokenSecret);
                    // return res.json({token:token})
                    return res.json({msg:'done',status:true,token:token});
                }
                else{
                    return res.json({msg:'Wrong Password'});
                }
        }else{
            return res.json({msg:'Check With Your User Id'});
        }
    });
});

router.get('/clgDetails',jwtHelper.verifyToken,(req,res,next)=>{
    CollegeRegister.find({Flag:"1"},(err,doc)=>{
        if(doc){
            Names=[];
            Emails=[];
            collegeCodes=[];
            profiles=[];
            PhoneNumbers=[]
            for(var i=0;i<doc.length;i++){
                Names.push(doc[i].collegeName);
                Emails.push(doc[i]._id);
                collegeCodes.push(doc[i].collegeCode);
                PhoneNumbers.push(doc[i].PhoneNumber);
                profiles.push(doc[i].ProfileImage);
            }
            return res.send({Names,Emails,collegeCodes,PhoneNumbers,profiles})
        }
        else{
            return res.send({msg:'no docs'})
        }
    });
})

router.get('/clgDetail',jwtHelper.verifyToken,(req,res,next)=>{
    CollegeRegister.find({Flag:"0"},(err,doc)=>{
        if(doc){
            Names=[];
            Emails=[];
            collegeCodes=[];
            profiles=[];
            PhoneNumbers=[]
            for(var i=0;i<doc.length;i++){
                Names.push(doc[i].collegeName);
                Emails.push(doc[i]._id);
                collegeCodes.push(doc[i].collegeCode);
                PhoneNumbers.push(doc[i].PhoneNumber);
                profiles.push(doc[i].ProfileImage);
            }
            return res.send({Names,Emails,collegeCodes,PhoneNumbers,profiles})
        }
        else{
            return res.send({msg:'no docs'})
        }
    });
})

router.post('/register',(req,res,next)=>{
    let admin=new Admin({
        _id:req.body.EmailId,
        Password:req.body.Password
    });
    Admin.create(admin).then(admin=>{
        return res.send("Created SuccessFully");
    })

})
router.post('/delete/:id',(req,res,next)=>{
    CollegeRegister.findByIdAndDelete({_id:req.params.id},(err,docs)=>{
        if(!err){
            return res.json({msg:"Deleted Successfully.."})
        }else{
            console.log("not Done")
        }
    });
})

router.post('/confirm/:id',(req,res,next)=>{
    CollegeRegister.findByIdAndUpdate({_id:req.params.id},{
        $set:{Flag:"1"}
    },
    {
        new:true
    },
    function(err,update){
        if(err){
            return res.json({msg:'Error'})
        }
        else {
            if(update){
                return res.send({msg:'Confirmed'})
            }
                //res.json({update})
            else
                return res.json({msg:'not done'})
        }
    });
})

router.post('/afterDelete/:id',(req,res,next)=>{
    post.findByIdAndDelete({_id:req.params.id},(err,docs)=>{
        if(!err){
            return res.json({msg:"Deleted Successfully.."})
        }
        else{
            console.log(err)
        }
    })
})

router.post('/addClg',(req,res,next)=>{
    ClgList.findOne({
        _id:"clgList"
    }).then(clg=>{
        if(clg){
            name=clg.clgName;
            name.push(req.body.name);
            cod=clg.clgCode
            cod.push(req.body.code)
            ClgList.updateOne({_id:"clgList"},{clgName:name,clgCode:cod}).then(done=>{
                return res.send({msg:'Added To The List'})
            })
        }
        else{
            ClgList.create({_id:"clgList",clgName:req.body.name,clgCode:req.body.code,Flag:"0"})
            .then(clg=>{
                return res.json({msg:'Added To The List'});
             });
        }
    })
})

router.get('/getClg',(req,res,next)=>{
    ClgList.find({_id:"clgList"}).then(doc=>{
        if(doc){
            collegeCodes=[];
            Names=[];
            newValue=doc[0].clgName;
            for(var i=0;i<newValue.length;i++){
                Names.push(newValue[i])
            }
            newValue=doc[0].clgCode;
            for(var i=0;i<newValue.length;i++){
                collegeCodes.push(newValue[i])
            }
            return res.json({Names,collegeCodes})
        }
        else{
            collegeCodes=[];
            Names=[];
            return res.json({Names,collegeCodes})
        }

    })
    .catch(err=>{
        return res.send("No data")
    })
})
router.get('/getClgs',(req,res,next)=>{
    CollegeRegister.find({Flag:"1"}).then(doc=>{
        if(doc){
            collegeCodes=[];
            Names=[];
            for(var i=0;i<doc.length;i++){
                Names.push(doc[i].collegeName)
                collegeCodes.push(doc[i].collegeCode)
            }
            return res.json({Names,collegeCodes})
        }
        else{
            collegeCodes=[];
            Names=[];
            return res.json({Names,collegeCodes})
        }

    })
    .catch(err=>{
        return res.send("No data")
    })
})
module.exports=router;