
const {SignupModel}=require("../models/Signup.models")
const express=require("express")
const UserRoute=express.Router()
const bcrypt =require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()


UserRoute.post("/register",async (req,res)=>{
  const {email,password,name,gender}=req.body;
  const email_present=await SignupModel.findOne({email})
  if(email_present?.email){
    res.send("Email Already Exist")
  }else{
  try{
      bcrypt.hash(password, 5,async(err, secure_password)=>{
          // Store hash in your password DB.
  if(err){
      console.log(err)
  }
  else{
      const user=new SignupModel({email,password:secure_password,name,gender});
      await user.save();
      res.send("Registered");
  }
      });
  }
  catch(err){
      res.send("err while doing registration")
  res.send(err)
  }
}
  })
  
  UserRoute.post("/login",async(req,res)=>{
      const {email,password}=req.body;
      try{
          const user=await SignupModel.find({email});
          const hashed_pass=user[0].password; 
          if(user.length>0)
          {
        bcrypt.compare(password, hashed_pass, function(err, result) {
             // result == true
  if(result){
      const token = jwt.sign({userID:user[0]._id}, 'masai');
      res.send({"msg":"Login successful","token":token});
  }
  else{
      res.send("wrong credential");
  }
              });
          }
          else{
              res.send("Wrong credential!!")
          }
          
      }
      catch(err){
          res.send(err)
      } 
  })

    //  SignupRoute.get("/",(req,res)=>{
           
    //      let data=SignupModel.find()
    //      res.send(data)
    //  })

  module.exports={
    UserRoute
  }