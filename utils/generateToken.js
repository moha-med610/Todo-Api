const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/users');

const generateToken = (userId) => {
    return jwt.sign({ id: userId}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
}

module.exports = generateToken;