//import mongoose.
const mongoose = require("mongoose")

//create a variable.
const userDetailsSchema = new mongoose.Schema(
    {
        //theunique part is to ensure same user doesn't register twice.
        email: {type:String, unique:true}, 
        password : String, 
        confirmPassword : String, 
        number : String, 
        sex : String,
    },
    {
        collection: "userInfo"
    }
);

//create a model and pass your schema.
mongoose.model("userInfo", userDetailsSchema)

//going to app.js to impotr this schema.

//email, password, confirmPassword, number, sex