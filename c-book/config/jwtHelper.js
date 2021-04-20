const  jwt=require('jsonwebtoken');
const{CollegeRegister}=require('../models/clgregister');
const{post}=require('../models/posts');


name=[];
profile=[];
id=[];
module.exports.verifyToken=(req,res,next)=>{
  const authHeader = req.headers.authorization;
  const accessTokenSecret = 'somerandomaccesstoken';

  if (authHeader) {
      const token = authHeader.split(' ')[1];
    if(token){
      jwt.verify(token, accessTokenSecret, (err, user) => {
          if (err) {
              //console.log('token');
              req.category='none';
              next()
          }else{
          req.email = user.email;
          req.category=user.category;
          next();
          }
      });
  }else{
    next();
  }
}
}
