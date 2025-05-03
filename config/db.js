const mongoose = require('mongoose');
require('dotenv').config();
const cli = require('cli-colors');


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(cli.bgGreen('MONGODB CONNECTED SUCCESSFULLY...'));
    } catch (error) {
        console.error(cli.bgRed('MONGODB CONNECTION ERROR: '), error.message);
        process.exit(1);
    }
}

module.exports = connectDB;