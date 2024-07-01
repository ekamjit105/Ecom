const mongoose = require('mongoose') ;   //in ES6 we use import, in nodejs we use require

//create a function
const connectDB = async() =>{

    try{
        const url = process.env.MONGO_URI;  //from .env file, data accessed through process.env
        const conn= await mongoose.connect(url,{
        });

        console.log("MongoDB database connected");
    }
    catch(error){
        console.log(`Database connection error: ${error.message}`);
    }

};

module.exports=connectDB;       //in ES6 we use export, in nodejs we use module.exports