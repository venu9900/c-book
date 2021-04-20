const express=require('express');
var router=express.Router();
const { mongoose }=require('../../db');
const multer=require('multer');
//Token congiguration
const jwt = require("jsonwebtoken")
const jwtHelper=require('../../config/jwtHelper')
//Importing Models
var path = require('path');
const {StudentRegister}=require('../../models/studregister');
const {StaffRegister}=require('../../models/staffregister');
const {CollegeRegister}=require('../../models/clgregister');
const {post}=require('../../models/posts');
const {StaffPost}=require('../../models/staffPost');
const {StudentPost}=require('../../models/studentPosts');
const {cultural}=require('../../models/cultural.js');
const {sports}=require('../../models/sports.js');
const {placement}=require('../../models/placement.js');
const {fdp}=require('../../models/fdp.js');
const { toNamespacedPath } = require('path');

//Variables
postArray=[];
dates=[];
times=[];
cnts=[];
images=0;
titles=[];
id=[];
names="";
profile="";
name=[];
profiles=[]
//Profile pic upload necessity configuration(single files)
const storage=multer.diskStorage({
    destination:(req,file,callBack)=>{
        callBack(null,'client/src/assets/uploads/profile');
    },
    filename:(req,file,callBack)=>{
        callBack(null,`${file.originalname}`);
    }
});

const fileFilter=(req,file,callBack)=>{
    if(file.mimetype=='image/jpeg' || file.mimetype=='image/jpg' ||file.mimetype=='image/png')
        callBack(null,true);
    else
        callBack(null,false);
}
var uploadProfile=multer({storage:storage,fileFilter:fileFilter});

//Post uploads necessity configuration(multiple files)
const storagePost=multer.diskStorage({
    destination:(req,file,callBack)=>{
        callBack(null,'client/src/assets/uploads/posts');
    },
    filename:(req,file,callBack)=>{
        callBack(null,`${file.originalname}`)
    }
});



var uploadPost=multer({storage:storagePost,fileFilter:fileFilter});

// PDF post by staff
const storagePDF=multer.diskStorage({
    destination:(req,file,callBack)=>{
        callBack(null,'client/src/assets/uploads/staffs');
    },
    filename:(req,file,callBack)=>{
        callBack(null,`${file.originalname}`)
    }
});

const fileFilterPDF=(req,file,callBack)=>{
    if(file.mimetype=='application/pdf')
        callBack(null,true);
    else
        callBack(null,false);
}

var uploadPDF=multer({storage:storagePDF,fileFilter:fileFilterPDF});
//STUDENT POST
const storagePst=multer.diskStorage({
    destination:(req,file,callBack)=>{
        callBack(null,'client/src/assets/uploads/student');
    },
    filename:(req,file,callBack)=>{
        callBack(null,`${file.originalname}`)
    }
});

const fileFilterPst=(req,file,callBack)=>{
    if(file.mimetype=='image/jpeg' || file.mimetype=='image/jpg' ||file.mimetype=='image/png')
        callBack(null,true);
    else
        callBack(null,false);
}

var uploadPst=multer({storage:storagePst,fileFilter:fileFilterPst});


//about confirmation of students and staffs
//<----?
router.get('/loadHead',jwtHelper.verifyToken,(req,res,next)=>{
    if(req.category=='college'){
        CollegeRegister.findOne({_id:req.email},(err,doc)=>{
            if(doc){
                return res.send({category:req.category,Name:doc.collegeName,ProfileImage:doc.ProfileImage,code:doc.collegeCode});
            }
            else{
                return res.send({msg:'no docs'})
            }
        });
    }else if(req.category=='student'){
        StudentRegister.findOne({_id:req.email},(err,doc)=>{
            if(doc){
                return res.send({category:req.category,Name:doc.Name,ProfileImage:doc.ProfileImage});
            }
            else{
                return res.send({msg:'no docs'})
            }
        });
    }else if(req.category=='staff'){
        StaffRegister.findOne({_id:req.email},(err,doc)=>{
            if(doc){
                return res.send({category:req.category,Name:doc.Name,ProfileImage:doc.ProfileImage});
            }
            else{
                return res.send({msg:'no docs'})
            }
        });
    }
    else{
        return res.send({Auth:false})
    }
})

router.get('/getDetails',jwtHelper.verifyToken,(req,res,next)=>{
    if(req.category!='none'){
        if(req.category=='staff'){
            StaffRegister.findOne({_id:req.email},(err,doc)=>{
                if(doc){
                    return res.send({
                        category:req.category,
                        Name:doc.Name,
                        Email:doc._id,
                        Phone:doc.PhoneNumber,
                        ProfileImage:doc.ProfileImage
                    });
                }
                else{
                    return res.send({Name:'no docs'});
                }
            });
        }
        else if(req.category=='student'){
            StudentRegister.findOne({_id:req.email},(err,doc)=>{
                if(doc){
                    return res.send({
                        category:req.category,
                        Name:doc.Name,
                        Email:doc._id,
                        Phone:doc.PhoneNumber,
                        collegeName:doc.collegeName,
                        Usn:doc.Usn,
                        ProfileImage:doc.ProfileImage
                    });
                }
                else{
                    return res.send({msg:'no docs'})
                }
            });
        }
        else if(req.category=='college'){
            CollegeRegister.findOne({_id:req.email},(err,doc)=>{
                if(doc){
                    return res.send({
                        category:req.category,
                        Name:doc.collegeName,
                        Email:doc._id,
                        collegeCode:doc.collegeCode,
                        Phone:doc.PhoneNumber,
                        ProfileImage:doc.ProfileImage
                    });
                }
                else{
                    return res.send({msg:'no docs'})
                }
            });
        }
    }
    else{
            return res.send({Auth:false})
        }
})
router.get('/cnfStudent/:code',(req,res,next)=>{
    StudentRegister.find({Flag:0,collegeCode:req.params.code.toUpperCase()},(err,doc)=>{
        if(!err){
            return res.send(doc);
        }else{
            return res.send(err)
        }
    })
})

router.get('/cnfStaff/:code',(req,res,next)=>{
    StaffRegister.find({Flag:0,collegeCode:req.params.code.toUpperCase()},(err,doc)=>{
        if(!err){
            return res.send(doc);
        }else{
            return res.send(err)
        }
    })
})

router.put('/DoneStaff/:_id',(req,res,next)=>{
    uid=req.params._id
    StaffRegister.findByIdAndUpdate(uid,
        {
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
                    return res.json({msg:"Confirmed successfully..!"})
                }
                    //res.json({update})
                else
                    return res.json({msg:'not done'})
            }
        }).catch(err=>{
            return res.json({msg:'err'})
        });
})
router.put('/DoneStud/:_id',(req,res,next)=>{
    uid=req.params._id
    StudentRegister.findByIdAndUpdate(uid,
        {
            $set:{Flag:"1"}
        },
        {
            new:true
        },
        function(err,update){
            if(err){
                return res.json({msg:'Error'})
            }
            else 
                return res.json({msg:'Confirmed successfull..!'})
        }).catch(err=>{
            res.json({msg:'err'})
        });
})
router.put('/DoneStaff/:_id',(req,res,next)=>{
    uid=req.params._id
    StaffRegister.findByIdAndUpdate(uid,
        {
            $set:{Flag:"1"}
        },
        {
            new:true
        },
        function(err,update){
            if(err){
                return res.json({msg:'Error'})
            }
            else 
                return res.json({msg:'Confirmed successfull..!'})
        }).catch(err=>{
            res.json({msg:'err'})
        });
})

//ADDING POST

router.post('/post',jwtHelper.verifyToken,uploadPost.array('postImages'),(req,res,next)=>{
    uid=req.email;
    filesArray=req.files;
    images=0;
    D=new Date();
    date=D.getDate()+'/'+D.getMonth()+'/'+D.getFullYear();
    time=D.getHours()+'.'+D.getMinutes();
        CollegeRegister.findById({_id:uid},(err,docs)=>{
            if(!err){
                    names=docs.collegeName;
                    profile=docs.ProfileImage;
            }
        });
    if(req.body.Filter=="all"){
    post.findOne({
        _id:uid
    })
    .then(user=>{
        if(user){
            postArray=[];        
// date updation
            dates=[]
            newValue=user.Date;
            for(var i=0;i<newValue.length;i++){
                dates.push(newValue[i]);
            }
            dates.push(date)
// time updation
            times=[]
            newValue=user.Time;
            for(var i=0;i<newValue.length;i++){
                times.push(newValue[i]);
            }
            times.push(time);

// time updation
            // filter=[]
            // newValue=user.Filter;
            // for(var i=0;i<newValue.length;i++){
            //     filter.push(newValue[i]);
            // }
            filter=(req.body.Filter);
// ttle updation
            titles=[]
            newValue=user.Title;
            for(var i=0;i<newValue.length;i++){
                titles.push(newValue[i]);
            }
            titles.push(req.body.Title);
// count updation
            cnts=[]
            newValue=user.Count;
            for(var i=0;i<newValue.length;i++){
                cnts.push(newValue[i]);
            }
// image updation
            newValue=user.postImages;
            for(var i=0;i<newValue.length;i++){
                postArray.push(newValue[i]);
            }
            for(var i=0;i<filesArray.length;i++){
                postArray.push(filesArray[i].path.slice('11'));
                images+=1
            }  
            cnts.push(images)
            post.updateOne({_id:uid},{postImages:postArray,Count:cnts,Date:dates,Time:times,Title:titles,collegeName:names,ProfileImage:profile,Filter:filter})
            .then(pst=>{
                return res.json({msg:'Posted Successfully'})
             });
        }
        else{
            postArray=[];
           for(var i=0;i<filesArray.length;i++){
                postArray.push(filesArray[i].path.slice('11'));
                images+=1
            }
            post.create({_id:uid,postImages:postArray,Date:date,Time:time,Count:images,Title:req.body.Title,collegeName:names,ProfileImage:profile,Filter:req.body.Filter})
            .then(pst=>{
                return res.json({msg:'Posted Successfully'});
             });
        }
    })
}
else if(req.body.Filter=="cultural"){
    cultural.findOne({
        _id:uid
    })
    .then(user=>{
        if(user){
            postArray=[];        
// date updation
            dates=[]
            newValue=user.Date;
            for(var i=0;i<newValue.length;i++){
                dates.push(newValue[i]);
            }
            dates.push(date)
// time updation
            times=[]
            newValue=user.Time;
            for(var i=0;i<newValue.length;i++){
                times.push(newValue[i]);
            }
            times.push(time);

// time updation
            // filter=[]
            // newValue=user.Filter;
            // for(var i=0;i<newValue.length;i++){
            //     filter.push(newValue[i]);
            // }
            filter=(req.body.Filter);
// ttle updation
            titles=[]
            newValue=user.Title;
            for(var i=0;i<newValue.length;i++){
                titles.push(newValue[i]);
            }
            titles.push(req.body.Title);
// count updation
            cnts=[]
            newValue=user.Count;
            for(var i=0;i<newValue.length;i++){
                cnts.push(newValue[i]);
            }
// image updation
            newValue=user.postImages;
            for(var i=0;i<newValue.length;i++){
                postArray.push(newValue[i]);
            }
            for(var i=0;i<filesArray.length;i++){
                postArray.push(filesArray[i].path.slice('11'));
                images+=1
            }  
            cnts.push(images)
            cultural.updateOne({_id:uid},{postImages:postArray,Count:cnts,Date:dates,Time:times,Title:titles,collegeName:names,ProfileImage:profile,Filter:filter})
            .then(pst=>{
                return res.json({msg:'Posted Successfully'})
             });
        }
        else{
            postArray=[];
           for(var i=0;i<filesArray.length;i++){
                postArray.push(filesArray[i].path.slice('11'));
                images+=1
            }
            cultural.create({_id:uid,postImages:postArray,Date:date,Time:time,Count:images,Title:req.body.Title,collegeName:names,ProfileImage:profile,Filter:req.body.Filter})
            .then(pst=>{
                return res.json({msg:'Posted Successfully'});
             });
        }
    })
}
else if(req.body.Filter=="sports"){
    sports.findOne({
        _id:uid
    })
    .then(user=>{
        if(user){
            postArray=[];        
// date updation
            dates=[]
            newValue=user.Date;
            for(var i=0;i<newValue.length;i++){
                dates.push(newValue[i]);
            }
            dates.push(date)
// time updation
            times=[]
            newValue=user.Time;
            for(var i=0;i<newValue.length;i++){
                times.push(newValue[i]);
            }
            times.push(time);

// time updation
            // filter=[]
            // newValue=user.Filter;
            // for(var i=0;i<newValue.length;i++){
            //     filter.push(newValue[i]);
            // }
            filter=(req.body.Filter);
// ttle updation
            titles=[]
            newValue=user.Title;
            for(var i=0;i<newValue.length;i++){
                titles.push(newValue[i]);
            }
            titles.push(req.body.Title);
// count updation
            cnts=[]
            newValue=user.Count;
            for(var i=0;i<newValue.length;i++){
                cnts.push(newValue[i]);
            }
// image updation
            newValue=user.postImages;
            for(var i=0;i<newValue.length;i++){
                postArray.push(newValue[i]);
            }
            for(var i=0;i<filesArray.length;i++){
                postArray.push(filesArray[i].path.slice('11'));
                images+=1
            }  
            cnts.push(images)
            sports.updateOne({_id:uid},{postImages:postArray,Count:cnts,Date:dates,Time:times,Title:titles,collegeName:names,ProfileImage:profile,Filter:filter})
            .then(pst=>{
                return res.json({msg:'Posted Successfully'})
             });
        }
        else{
            postArray=[];
           for(var i=0;i<filesArray.length;i++){
                postArray.push(filesArray[i].path.slice('11'));
                images+=1
            }
            sports.create({_id:uid,postImages:postArray,Date:date,Time:time,Count:images,Title:req.body.Title,collegeName:names,ProfileImage:profile,Filter:req.body.Filter})
            .then(pst=>{
                return res.json({msg:'Posted Successfully'});
             });
        }
    })
}
else if(req.body.Filter=="placement"){
    placement.findOne({
        _id:uid
    })
    .then(user=>{
        if(user){
            postArray=[];        
// date updation
            dates=[]
            newValue=user.Date;
            for(var i=0;i<newValue.length;i++){
                dates.push(newValue[i]);
            }
            dates.push(date)
// time updation
            times=[]
            newValue=user.Time;
            for(var i=0;i<newValue.length;i++){
                times.push(newValue[i]);
            }
            times.push(time);

// time updation
            // filter=[]
            // newValue=user.Filter;
            // for(var i=0;i<newValue.length;i++){
            //     filter.push(newValue[i]);
            // }
            filter=(req.body.Filter);
// ttle updation
            titles=[]
            newValue=user.Title;
            for(var i=0;i<newValue.length;i++){
                titles.push(newValue[i]);
            }
            titles.push(req.body.Title);
// count updation
            cnts=[]
            newValue=user.Count;
            for(var i=0;i<newValue.length;i++){
                cnts.push(newValue[i]);
            }
// image updation
            newValue=user.postImages;
            for(var i=0;i<newValue.length;i++){
                postArray.push(newValue[i]);
            }
            for(var i=0;i<filesArray.length;i++){
                postArray.push(filesArray[i].path.slice('11'));
                images+=1
            }  
            cnts.push(images)
            placement.updateOne({_id:uid},{postImages:postArray,Count:cnts,Date:dates,Time:times,Title:titles,collegeName:names,ProfileImage:profile,Filter:filter})
            .then(pst=>{
                return res.json({msg:'Posted Successfully'})
             });
        }
        else{
            postArray=[];
           for(var i=0;i<filesArray.length;i++){
                postArray.push(filesArray[i].path.slice('11'));
                images+=1
            }
            placement.create({_id:uid,postImages:postArray,Date:date,Time:time,Count:images,Title:req.body.Title,collegeName:names,ProfileImage:profile,Filter:req.body.Filter})
            .then(pst=>{
                return res.json({msg:'Posted Successfully'});
             });
        }
    })
}
else if(req.body.Filter=="fdp"){
    fdp.findOne({
        _id:uid
    })
    .then(user=>{
        if(user){
            postArray=[];        
// date updation
            dates=[]
            newValue=user.Date;
            for(var i=0;i<newValue.length;i++){
                dates.push(newValue[i]);
            }
            dates.push(date)
// time updation
            times=[]
            newValue=user.Time;
            for(var i=0;i<newValue.length;i++){
                times.push(newValue[i]);
            }
            times.push(time);

// time updation
            // filter=[]
            // newValue=user.Filter;
            // for(var i=0;i<newValue.length;i++){
            //     filter.push(newValue[i]);
            // }
            filter=(req.body.Filter);
// ttle updation
            titles=[]
            newValue=user.Title;
            for(var i=0;i<newValue.length;i++){
                titles.push(newValue[i]);
            }
            titles.push(req.body.Title);
// count updation
            cnts=[]
            newValue=user.Count;
            for(var i=0;i<newValue.length;i++){
                cnts.push(newValue[i]);
            }
// image updation
            newValue=user.postImages;
            for(var i=0;i<newValue.length;i++){
                postArray.push(newValue[i]);
            }
            for(var i=0;i<filesArray.length;i++){
                postArray.push(filesArray[i].path.slice('11'));
                images+=1
            }  
            cnts.push(images)
            fdp.updateOne({_id:uid},{postImages:postArray,Count:cnts,Date:dates,Time:times,Title:titles,collegeName:names,ProfileImage:profile,Filter:filter})
            .then(pst=>{
                return res.json({msg:'Posted Successfully'})
             });
        }
        else{
            postArray=[];
           for(var i=0;i<filesArray.length;i++){
                postArray.push(filesArray[i].path.slice('11'));
                images+=1
            }
            fdp.create({_id:uid,postImages:postArray,Date:date,Time:time,Count:images,Title:req.body.Title,collegeName:names,ProfileImage:profile,Filter:req.body.Filter})
            .then(pst=>{
                return res.json({msg:'Posted Successfully'});
             });
        }
    })
}
})

//GETTING POSTS
router.get('/getPosts',(req,res,next)=>{
    postArray={};
    post.find({Filter:'all'}).sort({Time:1}).exec(function(err,doc){
        if(!err){
            TotalCount=doc.length;
             for(var i=0;i<doc.length;i++){
                 temp=[];
                 l=doc[i].postImages.length;
                 cn=doc[i].Count.length;
                 c=doc[i].Count[cn-1];
                 k=0;
                 for(var j=l-c;j<l;j++){
                    temp[k]=(doc[i].postImages[j]);
                    k++;
                 }
                cnts[i]=doc[i].Count[cn-1];
                dates[i]=doc[i].Date[cn-1];
                times[i]=doc[i].Time[cn-1];
                titles[i]=doc[i].Title[cn-1];
                id[i]=doc[i].id;
                postArray[i]=temp;
                name[i]=doc[i].collegeName;
                profiles[i]=doc[i].ProfileImage
                
             }
            return res.send({postArray,dates,times,titles,cnts,TotalCount,name,profiles,id});
             //return res.json(postArray);
    }
        else
        console.log(D)

            //return res.send(err)
    })
});

router.post('/getPostByFilter',(req,res,next)=>{
    postArray={};
    if(req.body.filter=="all"){
    post.find({Filter:req.body.filter},(err,doc)=>{
        TotalCount=doc.length;
        console.log(req.body.filter);
        if(doc){
            console.log(doc.length);
        }
        if(!err){
             for(var i=0;i<doc.length;i++){
                 temp=[];
                 l=doc[i].postImages.length;
                 cn=doc[i].Count.length;
                 c=doc[i].Count[cn-1];
                 k=0;
                 for(var j=l-c;j<l;j++){
                    temp[k]=(doc[i].postImages[j]);
                    k++;
                 }
                cnts[i]=doc[i].Count[cn-1];
                dates[i]=doc[i].Date[cn-1];
                times[i]=doc[i].Time[cn-1];
                titles[i]=doc[i].Title[cn-1];
                id[i]=doc[i].id;
                postArray[i]=temp;
                name[i]=doc[i].collegeName;
                profiles[i]=doc[i].ProfileImage
                
             }
             console.log(postArray);
            return res.send({postArray,dates,times,titles,cnts,TotalCount,name,profiles,id});
             //return res.json(postArray);
    }
        else
            return res.send(err)
    })
}
else if(req.body.filter=="cultural"){
    cultural.find({Filter:req.body.filter},(err,doc)=>{
        TotalCount=doc.length;
        console.log(req.body.filter);
        if(doc){
            console.log(doc.length);
        }
        if(!err){
             for(var i=0;i<doc.length;i++){
                 temp=[];
                 l=doc[i].postImages.length;
                 cn=doc[i].Count.length;
                 c=doc[i].Count[cn-1];
                 k=0;
                 for(var j=l-c;j<l;j++){
                    temp[k]=(doc[i].postImages[j]);
                    k++;
                 }
                cnts[i]=doc[i].Count[cn-1];
                dates[i]=doc[i].Date[cn-1];
                times[i]=doc[i].Time[cn-1];
                titles[i]=doc[i].Title[cn-1];
                id[i]=doc[i].id;
                postArray[i]=temp;
                name[i]=doc[i].collegeName;
                profiles[i]=doc[i].ProfileImage
                
             }
             console.log(postArray);
            return res.send({postArray,dates,times,titles,cnts,TotalCount,name,profiles,id});
             //return res.json(postArray);
    }
        else
            return res.send(err)
    })
}
else if(req.body.filter=="sports"){
    sports.find({Filter:req.body.filter},(err,doc)=>{
        TotalCount=doc.length;
        console.log(req.body.filter);
        if(doc){
            console.log(doc.length);
        }
        if(!err){
             for(var i=0;i<doc.length;i++){
                 temp=[];
                 l=doc[i].postImages.length;
                 cn=doc[i].Count.length;
                 c=doc[i].Count[cn-1];
                 k=0;
                 for(var j=l-c;j<l;j++){
                    temp[k]=(doc[i].postImages[j]);
                    k++;
                 }
                cnts[i]=doc[i].Count[cn-1];
                dates[i]=doc[i].Date[cn-1];
                times[i]=doc[i].Time[cn-1];
                titles[i]=doc[i].Title[cn-1];
                id[i]=doc[i].id;
                postArray[i]=temp;
                name[i]=doc[i].collegeName;
                profiles[i]=doc[i].ProfileImage
                
             }
             console.log(postArray);
            return res.send({postArray,dates,times,titles,cnts,TotalCount,name,profiles,id});
             //return res.json(postArray);
    }
        else
            return res.send(err)
    })
}
else if(req.body.filter=="placement"){
    placement.find({Filter:req.body.filter},(err,doc)=>{
        TotalCount=doc.length;
        console.log(req.body.filter);
        if(doc){
            console.log(doc.length);
        }
        if(!err){
             for(var i=0;i<doc.length;i++){
                 temp=[];
                 l=doc[i].postImages.length;
                 cn=doc[i].Count.length;
                 c=doc[i].Count[cn-1];
                 k=0;
                 for(var j=l-c;j<l;j++){
                    temp[k]=(doc[i].postImages[j]);
                    k++;
                 }
                cnts[i]=doc[i].Count[cn-1];
                dates[i]=doc[i].Date[cn-1];
                times[i]=doc[i].Time[cn-1];
                titles[i]=doc[i].Title[cn-1];
                id[i]=doc[i].id;
                postArray[i]=temp;
                name[i]=doc[i].collegeName;
                profiles[i]=doc[i].ProfileImage
                
             }
             console.log(postArray);
            return res.send({postArray,dates,times,titles,cnts,TotalCount,name,profiles,id});
             //return res.json(postArray);
    }
        else
            return res.send(err)
    })
}
else if(req.body.filter=="fdp"){
    fdp.find({Filter:req.body.filter},(err,doc)=>{
        TotalCount=doc.length;
        console.log(req.body.filter);
        if(doc){
            console.log(doc.length);
        }
        if(!err){
             for(var i=0;i<doc.length;i++){
                 temp=[];
                 l=doc[i].postImages.length;
                 cn=doc[i].Count.length;
                 c=doc[i].Count[cn-1];
                 k=0;
                 for(var j=l-c;j<l;j++){
                    temp[k]=(doc[i].postImages[j]);
                    k++;
                 }
                cnts[i]=doc[i].Count[cn-1];
                dates[i]=doc[i].Date[cn-1];
                times[i]=doc[i].Time[cn-1];
                titles[i]=doc[i].Title[cn-1];
                id[i]=doc[i].id;
                postArray[i]=temp;
                name[i]=doc[i].collegeName;
                profiles[i]=doc[i].ProfileImage
                
             }
             console.log(postArray);
            return res.send({postArray,dates,times,titles,cnts,TotalCount,name,profiles,id});
             //return res.json(postArray);
    }
        else
            return res.send(err)
    })
}
})


//GETTING STUDENTS POSTS
router.get('/getPostStudent',(req,res,next)=>{
    postArray={};
    StudentPost.find({},(err,doc)=>{
        TotalCount=doc.length;
        if(!err){
             for(var i=0;i<doc.length;i++){
                 temp=[];
                 l=doc[i].Talents.length;
                 cn=doc[i].Count.length;
                 c=doc[i].Count[cn-1];
                 k=0;
                 for(var j=l-c;j<l;j++){
                    temp[k]=(doc[i].Talents[j]);
                    k++;
                 }
                cnts[i]=doc[i].Count[cn-1];
                dates[i]=doc[i].Date[cn-1];
                times[i]=doc[i].Time[cn-1];
                titles[i]=doc[i].Label[cn-1];
                postArray[i]=temp;
                name[i]=doc[i].Name;
                profiles[i]=doc[i].ProfileImage
                
             }
            return res.send({postArray,dates,times,titles,cnts,TotalCount,name,profiles,name,profiles});
             //return res.json(postArray);
    }
        else
            return res.send(err)
    })
})


//PROFILE UPDATE
router.put('/update',jwtHelper.verifyToken,uploadProfile.single('profileImage'),(req,res,next)=>{
    uid=req.email;
    paths=req.file.path;
    if(req.category=='staff'){
        StaffRegister.findByIdAndUpdate(uid,
            {
            $set:{Name:req.body.Name,PhoneNumber:req.body.PhoneNumber,ProfileImage:req.file.path.slice(11)}
            },
            {
                new:true
            },
            function(err,update){
                if(err)
                    return res.json({msg:'Error'})
                else{
                    return res.json({msg:'Updated successfully..',status:true})
                }

            }).catch(err=>{
                return res.json({msg:'Error'})
            })
        }
       else if(req.category=='student'){
            StudentRegister.findByIdAndUpdate(uid,
                {
                $set:{Name:req.body.Name,collegeName:req.body.collegeName,PhoneNumber:req.body.PhoneNumber,ProfileImage:req.file.path.slice(11)}
                },
                {
                    new:true
                },
                function(err,update){
                    if(err)
                        return res.json({msg:'Error'})
                    else
                        return res.json({msg:'Updated successfully..',status:true})
    
                }).catch(err=>{
                    return res.json({msg:'Error'})
                })
            }
        else if(req.category=='college'){
            CollegeRegister.findByIdAndUpdate(uid,
                {
                $set:{Name:req.body.collegeName,collegeName:req.body.collegeName,PhoneNumber:req.body.PhoneNumber,ProfileImage:req.file.path.slice(11)}
                },
                {
                    new:true
                },
                function(err,update){
                    if(err)
                    {
                        return res.json({msg:'Error'})
                    }
                    else
                    {
                        return res.json({msg:'Updated successfully..',status:true})
                    }
    
                }).catch(err=>{
                    return res.json({msg:'Error'})
                })
            }
        });

//STAFF PDF POST
router.post('/postStaff',jwtHelper.verifyToken,uploadPDF.array('postPDF'),(req,res,next)=>{
    uid=req.email;
    filesArray=req.files;
    D=new Date();
    date=D.getDate()+'/'+D.getMonth()+'/'+D.getFullYear();
    StaffRegister.findById({_id:uid},(err,docs)=>{
        if(!err){
                names=docs.Name;
                profile=docs.ProfileImage;
        }
    });
    StaffPost.findOne({
        _id:uid
    })
    .then(user=>{
        if(user){
            postArray=[];
            titles=[];
            times=[];
            dates=[];
            cnts=[];
            images=0
            temp=[];     
// date updation
            newValue=user.Date;
            for(var i=0;i<newValue.length;i++){
                dates.push(newValue[i]);
            }
            dates.push(date)
//Label updation
            newValue=user.Label;
            for(var i=0;i<newValue.length;i++){
                titles.push(newValue[i]);
            }
            titles.push(req.body.Label);
// Count Updation
            newValue=user.Count;
            for(var i=0;i<newValue.length;i++){
                cnts.push(newValue[i]);
            }
// image updation
            newValue=user.PDFPath;
            for(var i=0;i<newValue.length;i++){
                postArray.push(newValue[i]);
            }
            for(var i=0;i<filesArray.length;i++){
                temp.push(filesArray[i].path.slice('11'));
                images+=1
            }
            postArray.push(temp);
            cnts.push(images)  
            StaffPost.updateOne({_id:uid},{PDFPath:postArray,Date:dates,Count:cnts,Label:titles,Name:names,ProfileImage:profile})
            .then(pst=>{
                return res.json({msg:'Posted Successfully'})
             });
        }
        else{
            postArray=[];
            temp=[];
            images=0;
           for(var i=0;i<filesArray.length;i++){
                temp.push(filesArray[i].path.slice('11'));
                images+=1
            }
            postArray.push(temp)
            StaffPost.create({_id:uid,PDFPath:postArray,Date:date,Count:images,Label:req.body.Label,Name:names,ProfileImage:profile})
            .then(pst=>{
                return res.json({msg:'Posted Successfully'});
             });
        }
    });
});
//------?>

// demo
router.put('/afterProfileUpdate',jwtHelper.verifyToken,uploadProfile.single('profileImage'),(req,res,next)=>{
    uid=req.email;
    if(req.category=='college')
    {
        post.updateOne({_id:uid},
            {
                $set:{ProfileImage:req.file.path.slice(11)}
            },
            {new:true},
            function(err,pic){
            if(!err){
                return res.send('done')
            }
            else{
                return res.send(err)
            }
        })
    }
    else if(req.category=='staff'){
        StaffPost.updateOne({_id:uid},
            {
                $set:{ProfileImage:req.file.path.slice(11)}
            },
            {new:true},
            function(err,pic){
            if(!err){
                return res.send('done')
            }
            else{
                return res.send("not done")
            }
        })
    }
    else if(req.category=='student'){
        StudentPost.updateOne({_id:uid},
            {
                $set:{ProfileImage:req.file.path.slice(11)}
            },
            {new:true},
            function(err,pic){
            if(!err){
                return res.send('done')
            }
            else{
                return res.send("not done")
            }
        })
    }
    
})

//STUDENT POST TALENT
router.post('/postStudent',jwtHelper.verifyToken,uploadPst.array('Talent'),(req,res,next)=>{
    uid=req.email;
    filesArray=req.files;
    D=new Date();
    date=D.getDate()+'/'+D.getMonth()+'/'+D.getFullYear();
    time=D.getHours()+'.'+D.getMinutes();
    StudentRegister.findById({_id:uid},(err,docs)=>{
        if(!err){
                names=docs.Name;
                profile=docs.ProfileImage;
        }
    });
    StudentPost.findOne({
        _id:uid
    })
    .then(user=>{
        if(user){
            postArray=[];
            titles=[];
            times=[];
            dates=[];
            cnts=[];
            images=0        
// date updation
            newValue=user.Date;
            for(var i=0;i<newValue.length;i++){
                dates.push(newValue[i]);
            }
            dates.push(date);
//Time Updation
            newValue=user.Time;
            for(var i=0;i<newValue.length;i++){
                times.push(newValue[i]);
            }
            times.push(time);
//Label updation
            newValue=user.Label;
            for(var i=0;i<newValue.length;i++){
                titles.push(newValue[i]);
            }
            titles.push(req.body.Label);
// Count Updation
newValue=user.Count;
            for(var i=0;i<newValue.length;i++){
                cnts.push(newValue[i]);
            }
// image updation
            newValue=user.Talents;
            for(var i=0;i<newValue.length;i++){
                postArray.push(newValue[i]);
            }
            for(var i=0;i<filesArray.length;i++){
                postArray.push(filesArray[i].path.slice('11'));
                images+=1
            }
            cnts.push(images)  
            StudentPost.updateOne({_id:uid},{Talents:postArray,Date:dates,Count:cnts,Label:titles,Name:names,ProfileImage:profile,Time:times})
            .then(pst=>{
                return res.json({msg:'Posted Successfully'})
             });
        }
        else{
            postArray=[];
            images=0;
           for(var i=0;i<filesArray.length;i++){
                postArray.push(filesArray[i].path.slice('11'));
                images+=1
            }
            StudentPost.create({_id:uid,Talents:postArray,Date:date,Count:images,Label:req.body.Label,Name:names,ProfileImage:profile,Time:time})
            .then(pst=>{
                return res.json({msg:'Posted Successfully'});
             });
        }
    });
});

//Getting References
router.get('/getNotes',(req,res,next)=>{
    StaffPost.find({},(err,doc)=>{
        name=[];
        titles=[];
        cnts=[];
        postArray=[];
        Files=[];
        tempt=[]
        TotalCount=doc.length
        for(var i=0;i<doc.length;i++){
            tempt=[]
            filename=[]
            name.push(doc[i].Name);
            cnts.push(doc[i].Count);
            titles.push(doc[i].Label);
            postArray.push(doc[i].PDFPath);
            for(var j=0;j<cnts[i].length;j++){
                temp=[];
                for(var k=0;k<cnts[i][j];k++){
                    temp.push(doc[i].PDFPath[j][k].slice(22))
                }
                tempt.push(temp)
            }
            Files.push(tempt)
        }
        //console.log(name,titles,cnts,postArray)
       return res.send({postArray,titles,cnts,name,TotalCount,Files});
        //return res.json(postArray);
})
})

router.post('/download',function(req,res,next){
    filepath = path.join(__dirname,'../../client/src/assets/uploads/staffs') +'/'+ req.body.filename;
    res.sendFile(filepath);
});

router.post('/search',function(req,res,next){
    postArray=[];
    nme=req.body.searchText
    console.log(nme.toUpperCase())
    post.findOne({collegeName:nme.toUpperCase()},(err,doc)=>{
        if(doc){
            temp=[]
            times=doc.Time;
            titles=doc.Title;
            names=doc.collegeName;
            dates=doc.Date;
            profile=doc.ProfileImage;
            cnts=doc.Count;
            TotalCount=cnts.length
            for(var i=0;i<cnts.length;i++){
                for(var j=0;j<cnts[i];j++){
                    temp[j]=doc.postImages[j]
                }
                postArray.push(temp);
                temp=[]
            }
            return res.send({postArray,dates,times,titles,cnts,names,profile,TotalCount,search:true});
    }
        else
            return res.send({msg:'Posts not available',search:false})
    })
})

router.get('/viewProfile/:ids',(req,res,next)=>{
    ids=req.params.ids;
    CollegeRegister.findById({_id:ids},(err,doc)=>{
        if(doc){
            return res.send({Name:doc.collegeName,Code:doc.collegeCode,Profile:doc.ProfileImage,Contact:doc.PhoneNumber,Princi:doc.PrincipleId})
        }
        else{
            console.log("error")
        }
    })
})
router.get('/viewProfile/:ids',(req,res,next)=>{
    ids=req.params.ids;
    CollegeRegister.findById({_id:ids},(err,doc)=>{
        if(doc){
            return res.send({Name:doc.collegeName,Code:doc.collegeCode,Profile:doc.ProfileImage,Contact:doc.PhoneNumber,Princi:doc.PrincipleId})
        }
        else{
            console.log("error")
        }
    })
})

router.get('/viewPost/:ids',(req,res,next)=>{
    ids=req.params.ids;
    post.findOne({_id:ids},(err,doc)=>{
        if(doc){
            return res.send({Posts:doc.postImages,Filt:'All'})
        }
    })
})
router.get('/viewPostC/:ids',(req,res,next)=>{
    ids=req.params.ids;
    cultural.findOne({_id:ids},(err,doc)=>{
        if(doc){
            return res.send({Posts:doc.postImages,Filt:'Cultural'})
        }
    })
})
router.get('/viewPostS/:ids',(req,res,next)=>{
    ids=req.params.ids;
    sports.findOne({_id:ids},(err,doc)=>{
        if(doc){
            return res.send({Posts:doc.postImages,Filt:'Sports'})
        }
    })
})
router.get('/viewPostP/:ids',(req,res,next)=>{
    ids=req.params.ids;
    placement.findOne({_id:ids},(err,doc)=>{
        if(doc){
            return res.send({Posts:doc.postImages,Filt:'Placement'})
        }
    })
})
router.get('/viewPostF/:ids',(req,res,next)=>{
    ids=req.params.ids;
    fdp.findOne({_id:ids},(err,doc)=>{
        if(doc){
            return res.send({Posts:doc.postImages,Filt:'FDP'})
        }
    })
})
router.post('/filter',(req,res,next)=>{
    
})
module.exports=router;