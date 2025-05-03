const connectDB = require('./db');
const cli = require('cli-colors');
require('dotenv').config();

const port = process.env.PORT || 3000;

const startServer = async (app) => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(cli.bgGreen(`SERVER IS RUNNING ON: `) + ` http://localhost:${port}`);
        });
    } catch (error) {
        console.log(cli.bgRed('Error starting server: '), error.message);
        process.exit(1);
    }
}

module.exports = startServer;