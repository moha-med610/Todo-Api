const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../middleware/asyncHandler");
const AppError = require("../utils/AppError");
const generateToken = require("../utils/generateToken");
require("dotenv").config();

const signUp = asyncHandler(async (req, res, next) => {
    const { fullName, email, password } = req.body;

    if(!fullName || !email || !password) {
        return next(AppError.error(400, "failed", "All fields are required"));
    }

    if(fullName.length < 3 || password.length < 6) {
        return next(AppError.error(400, "name", "The Inputs is very Short"));
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return next(AppError.error(400, "fail", "User already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await User.create({
        fullName,
        email,
        password: hashedPassword,
    })

    const token = generateToken(user._id);

    res.status(201).json({
        success: true,
        message: `Welcome ${user.fullName}. your signup was successful!`,
        data: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
        },
        token: token,
    });
});

const signIn = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return next(AppError.error(400, "failed", "All fields are required"));
    }

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(AppError.error(401, "error", "Invalid email or password"));
    }

    const tokenData = {
        id: user._id,
        email: user.email,
    }

    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const cookieOption = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    }

    res.cookie("token", token, cookieOption).status(200).json({
        success: true,
        status: 200,
        message: `Welcome Back ${user.fullName}.`,
        token: token,
    });
})

const signOut = asyncHandler(async (req, res, next) => {
    const cookieOption = {
        httpOnly: true,
        secure: true,
        expires: new Date(0),
    }



    res.cookie("token", '', cookieOption).status(200).json({
        success: true,
        status: 200,
        message: `See You Soon.`,
    })
})


module.exports = {
    signUp,
    signIn,
    signOut
}