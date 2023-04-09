const mongoose=require('mongoose');
const mongoURI="mongodb://localhost:27017/inotebook";

module.exports =  ()=> {
    try{
     mongoose.connect(mongoURI, {useNewUrlParser: true});
     console.log("Db connected Successfully");
    }
    catch(error){
       console.log("Database Connectivity Error");
       throw new Error(error);
    }
}