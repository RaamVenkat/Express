const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, "Add user name"]
    },
    email:{
        type: String,
        required: [true, "Add email"],
        unique:[true,"Already registered"]
    },
    password:{
        type: String,
        required: [true, "Add password"]
    }
},{
    timestamps:true,
});

module.exports = mongoose.model("users",userSchema);