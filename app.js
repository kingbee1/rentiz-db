//import express.
const express = require("express")
//initialise it ti the app.
const app=express()
//import mongoose.
const mongoose = require("mongoose")
app.use(express.json())

//import cors.
const cors = require ("cors")
//then use it.
app.use(cors());

//import bcryptjs.
const bcryptjs = require ("bcryptjs")

//import jwebtoken.
const jwt = require ("jsonwebtoken")

//random numbers and characters.
const JWT_SECRET = "hgskdfdskfhdskfjds(*7mbvm )[}':khw4we£4BN";

//create a function and paste this from mongodb.
const mongoUrl = 'mongodb+srv://abiodun:abiodun@cluster0.huo81ir.mongodb.net/?retryWrites=true&w=majority';

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

  //import the schema here.
  require("./userDetails")

  //create const user
  const User =mongoose.model('userInfo')
  
  app.post("/register", async(req, res)=> {
    //get all required data from req.body
    const{email, password, confirmPassword, number, sex} = req.body;
    //create a variable to add bcryptjs to the password.
    const encryptedPassword = await bcryptjs.hash(password, 10)
    try {
        //handling the unique email ish here.
        //added await so it will have time to execute, if not user already exist will keep popping.
        const oldUser = await User.findOne({ email })
        //if there's an existing user?
        if(oldUser){
            //put return to ensure the next code block is not fired if api returns error.
        return  res.send({error:"User already exists."})
        }
        //this will create a new user in the mongodb.
        await User.create({
            email, 
            password:encryptedPassword, 
            confirmPassword:encryptedPassword, 
            number, 
            sex,
        });
        res.send({status:"oka"})
    } catch (error) {
        res.send({status:"error"})
    }
  });

  //create login api.
  app.post("/login", async(req, res)=> {
    const{email, password} = req.body;
    //to find if user exist or not.
    const user = await User.findOne({ email });
    if(!user){
    return  res.send({error:"user not found."})
    } //decrypt password. use await because it might take time.
    //compare to compare password with the one from users.
    if(await bcryptjs.compare(password, user.password)){
        //use functional variable of sign.
        const token=jwt.sign({}, JWT_SECRET);
        //if user successfully logs in?
        if(res.status(200)){
            return res.json({status: "okay", data:token })
        }else {
            return res.json({error: "error"})
        }
    }
    res.json({status: "error", error:"incorrect password"})
  })

  //create api for user data when logged in. 
  app.post("/userData", async(req, res)=> {
    const { token } = req.body;
    try {
      //we first verify and store the value in user.
        const user = jwt.verify(token, JWT_SECRET)
        //to access the users email address.
        const userEmail = user.email;
        //find it with findOne, if found, then promise.
        User.findOne({ email: userEmail }).then((data)=> {
          res.send({ status:"okay", data: data })
        }).catch((error)=> {
          res.send({ status:"error", data: data })
        })

    } catch (error) {
        
    }
  })


//listen to see if it has started on port number 5000.
app.listen(5000, ()=> {
    console.log("server started o");
})

//make a basic api to send a request and recieve response.

// app.post("/post", async(req, res)=>{
//     console.log(req.body)
//     //destructure
//     const {data}=req.body;

//     //use try to catxch error. try block to run the response.
//     //handling error in the try block.
//     try {
//         if(data=="biodun"){
//             //this, so we can recieve a response.
//             res.send({status: "okay"})
//         } else {
//             res.send({status: "wrong person."})
//         }
        
//     } catch (error) {
//         res.send({status: "you made a mistake."})
//     }

// })

// //import userdetails schema.
// require("./userDetails")

// //create a variable to access the model in userdetails.
// const User = mongoose.model("userInfo")

// app.post("/register", async (req, res)=> {
//     const {name, email, number} = req.body;
//     try {
//         await User.create({
//             username: name,
//             //because it's written the same way.
//             email,
//             pnumber: number,
//         });
//         res.send({status:"okay"})
//     } catch (error) {
//         res.send({status: "errorrr"})
//     }
// })
