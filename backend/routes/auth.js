const express= require('express');
const User=require('../models/User');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');
var jwt= require('jsonwebtoken');
var fetchuser=require('../middleware/fetchUser');
const JWT_SECERT='bilalshabbir';

// Route 1: Create a user using: POST "api/auth/"
router.post('/createuser',[body('email').isEmail(),body('name').isLength({ min: 5 }),body('password').isLength({ min: 5 })],
  async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{

      let user = await User.findOne({ email: req.body.email });
      if (user){
        return res.status(400).json({error: "sorry user already exist"})
      }
      const salt=await bcrypt.genSalt(10);
      const secPass=await bcrypt.hash(req.body.password,salt)
      user= await User.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass,
      });

      const data={
        user:{
          id:user.id
        }
      }

      const authtoken= jwt.sign(data,JWT_SECERT);
      res.json({authtoken});
    }catch(error){
      console.log(error.message);
      res.status(500).send("Internal Server error occured!")
    }
})

// Routes 2: authenticate a user

router.post('/login',
  [body('email').isEmail(),
  body('password').exists(),],
  async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    const {email,password}=req.body;
    try {
      let user=await User.findOne({email});
      if (!user){
        return res.status(400).json({error:"Please try to login with correct credentials"});
      }
      const passwordcompare= await bcrypt.compare(password,user.password);
      if (!passwordcompare){
        return res.status(400).json({error:"Please try to login with correct credentials"});
      }

      const payload={
        user:{
          id: user.id
        }
      }
      const authtoken= jwt.sign(payload,JWT_SECERT);
      res.json(authtoken);
      } catch(error) {
      console.log(error.message);
      res.status(500).send("Internal Server error occured!")
    }
  });


  // Route 3: get loggedin user detail using :post
  router.post('/getuser',fetchuser,async (req,res)=>{
    try {
      let userId=req.user.id;
      const user=await User.findById(userId).select('-password');
      res.send(user);
    }catch(error) {
      console.log(error.message);
      res.status(500).send("Internal Server error occured!")
    }
  });

module.exports=router