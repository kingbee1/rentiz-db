//import express.
const express = require("express")
//initialise it ti the app.
const app=express()

//listen to see if it has started on port number 5000.
app.listen(5000, ()=> {
    console.log("server started yet");
})