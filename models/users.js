const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullName:{
        type: String,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
},{ timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;