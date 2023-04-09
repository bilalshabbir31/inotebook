const express= require('express');
const User=require('../models/User');
const router=express.Router();
const { body, validationResult } = require('express-validator');


// Create a user using: POST "api/auth/"
router.post('/createuser',[body('email').isEmail(),body('name').isLength({ min: 5 }),body('password').isLength({ min: 5 })],
  async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let user = await User.findOne({ email: req.body.email });
    if (user){
      return res.status(400).json({error: "sorry user already exist"})
    }

    user= await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    
    res.json(user)
    
    // .then(user => res.json(user))
    // .catch(err=>{console.log(err)
    // res.json({error:"Please enter a unique value",message:err.message})})
})


module.exports=router