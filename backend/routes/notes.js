const express=require('express');
const router=express.Router();
const Note=require('../models/Note');
const fetchUser=require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');


router.get('/fetchallnotes',fetchUser,
    async (req,res)=>{
    const notes = await Note.find({user: req.user.id})
    res.json([notes])
})


router.post('/addnote',fetchUser,
    [
    body('title').isLength({min:3}),
    body('description').isLength({min:5}),
    ],
    async (req,res)=>{

        try{

            const {title,description,tag}=req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const note=new Note({
                title,description,tag,user: req.user.id
            })
            const saveNote=await note.save()
            res.json(saveNote)
        }catch(error) {
            console.log(error.message);
            res.status(500).send("Internal Server error occured!")
        }
    })

module.exports=router