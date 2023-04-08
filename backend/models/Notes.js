const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema=new Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    tag:{
        type:String,
        default: "General"
    },
    data:{
        type:Date,
        required: Date.now
    }
})

module.export=mongoose.model(
    'notes',NotesSchema
);