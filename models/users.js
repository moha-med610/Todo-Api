const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullName:{
        type: String,
        required: [true, "Name is required"],
        minlength: 3,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 6,
    },
},{ timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;