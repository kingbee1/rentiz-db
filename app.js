//import express.
const express = require("express")
//initialise it ti the app.
const app=express()
app.use(express.json())

//listen to see if it has started on port number 5000.
app.listen(5000, ()=> {
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
        if(dasta=="biodun"){
            //this, so we can recieve a response.
            res.send({status: "okay"})
        } else {
            res.send({status: "wrong person."})
        }
        
    } catch (error) {
        res.send({status: "you made a mistake."})
    }

})
