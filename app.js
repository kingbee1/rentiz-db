//import express.
const express = require("express")
//initialise it ti the app.
const app=express()
//import mongoose.
const mongoose = require("mongoose")
app.use(express.json())

//create a function and paste this from mongodb.
//const mongoUrl = "mongodb+srv://abiodun:GV@mJn8QNt66yNy@cluster0.qru9uw2.mongodb.net/?retryWrites=true&w=majority"
const mongoUrl = 'mongodb+srv://abiodun:GV@mJn8QNt66yNy@cluster0.qru9uw2.mongodb.net/test?retryWrites=true&w=majority';

//const mongoUrl = 'mongodb://abiodun:GV@mJn8QNt66yN@hostname:port/database';


//connect mongodb by passing the url and usenewurl.
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true, 
  })
  //promise for if the connection is successful, log that in the console.
  .then(() => {
    console.log("now connected to db");
  })
  .catch((e) => console.log(e));




//listen to see if it has started on port number 5000.
app.listen(8000, ()=> {
    console.log("server started");
})

//make a basic api to send a request and recieve response.

app.post("/post", async(req, res)=>{
    console.log(req.body)
    //destructure
    const {data}=req.body;

    //use try to catxch error. try block to run the response.
    //handling error in the try block.
    try {
        if(data=="biodun"){
            //this, so we can recieve a response.
            res.send({status: "okay"})
        } else {
            res.send({status: "wrong person."})
        }
        
    } catch (error) {
        res.send({status: "you made a mistake."})
    }

})
