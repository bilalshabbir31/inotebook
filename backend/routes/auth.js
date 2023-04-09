const express= require('express');
const User=require('../models/User');
const router=express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');
var jwt= require('jsonwebtoken');

const JWT_SECERT='bilalshabbir';

// Create a user using: POST "api/auth/"
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
      console.log(authtoken);

      res.json({authtoken});
    }catch(error){
      console.log(error.message);
      res.status(500).send("some error occured")
    }
})


module.exports=router