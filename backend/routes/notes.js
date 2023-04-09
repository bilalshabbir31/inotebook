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

    router.put('/updatenote/:id',fetchUser,
    async (req,res)=>{
        const {title,description,tag}=req.body;
        const newNote={};
        if (title){newNote.title=title};
        if (description){newNote.description=description};
        if (tag){newNote.tag=tag};

        // find the note to be update
        let note =await Note.findById(req.params.id);
        if(!note){
            res.status(404).send("Not Found")
        }
        if (note.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed");
        }
        note= await Note.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true});
        res.send(note);
    })

module.exports=router