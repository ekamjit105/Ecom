const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const OTP = require("../models/OTPModel")

router.post("/register", async (req, res) => {
 
    const {name,email,password,addresses}= req.body
    const newuser = new User({name,email,password,addresses})

  try {
        newuser.save()
        res.status(200).json({
          success:true,
          message:"Register Success"
        })
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.post("/login",async(req,res)=>{
const {email,password}=req.body
try {
  const user = await User.find({email,password})
  if(user.length>0)
  {
    const currentUser = {
      name : user[0].name,
      email : user[0].email,
      _id : user[0]._id,
      wishlist :user[0].wishlist,
      isAdmin :user[0].isAdmin,
      addresses : user[0].addresses
    }
    res.status(200).send(currentUser)
  }
  else{
    console.log("invalid cred")
    //alert("Login fail. Please check your credentials.")
    res.status(401).json({ error: "Invalid credentials" });
  }
} catch (error) {
  res.status(404)
}
})




router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(404).json({ message: error.stack });
  }
});

router.post("/deleteuser", async (req, res) => {
  const userid = req.body.userid;
  try {
    await User.findOneAndDelete({ _id: userid });
    res.status(200).send("User Deleted");
  } catch (error) {
    res.status(404).json({ message: error.stack });
  }
});


router.post('/finduser',async(req,res)=>{
  
  const {email} = req.body;
  
  try{
    const user = await User.findOne({email:email});
    
    if(user)
    {res.status(200).send({exists:true})
    }
    else{
      res.status(200).send({exists:false})
    }
  }
  catch(e)
  {
    res.status(404).send({exists:false})
  }
})


router.post('/saveOTP',async(req,res)=>{
  
  const {email,rcdOTP} = req.body;
  
  
  try{
    const user = await OTP.findOne({email:email});
    if(user)
    {
      (user.OTP=req.body.OTP)
      await user.save();
    }
    else{
      const newuser = new OTP(req.body)
      await newuser.save();
    }
    res.status(200).send({})
  }
  catch(e)
  {
    res.status(404).send({})
  }
})


router.post('/validateOTP',async(req,res)=>{
  
  const {email,rcdOTP} = req.body;
  

  try{
    const validotp = await OTP.find({email:req.body.email,OTP:req.body.OTP});
    var password= ""
    var resobj;
    if(validotp)
    {
      const userdetails = await User.findOne({email:email});
      if(userdetails)
      resobj = {matched:true, password:userdetails.password}
      else
      resobj = {matched:true, password:password}
    }
    else{
      resobj = {matched:false, password:password}
    }
    res.status(200).send(resobj)
  }
  catch(e)
  {
    res.status(404).send({})
  }
})


router.post("/deleteuser", async (req, res) => {
  const userid = req.body.userid;
  try {
    await User.findOneAndDelete({ _id: userid });
    res.status(200).send("User Deleted");
  } catch (error) {
    res.status(404).json({ message: error.stack });
  }
});




module.exports = router;
