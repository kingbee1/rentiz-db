//import mongoose.
const mongoose = require("mongoose")

//create a variable.
const userDetailsSchema = new mongoose.Schema(
    {
        username: String,
        email: String,
        pnumber: String,
    },
    {
        collection: "userInfo"
    }
);

//create a model and pass your schema.
mongoose.model("userInfo", userDetailsSchema)

//going to app.js to impotr this schema.