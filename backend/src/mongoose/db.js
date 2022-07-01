const Mongoose = require('mongoose');

const mongoUri = "mongodb+srv://nontent:Nont3nt%40p@cluster0.lnqgwk8.mongodb.net/?retryWrites=true&w=majority"
const SUCCESS_MESSAGE = "Connected to database";

/*
const options = {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 10000,
    keepAlive: true,
    keepAliveInitialDelay: 30000
}*/

let isConnected = false;

exports.connect = async () => {
    try {
        if (isConnected) return SUCCESS_MESSAGE;
        console.log('Opening connection to DB...');

        await Mongoose.connect(mongoUri);

        isConnected = true;
        return SUCCESS_MESSAGE;
    } catch (error) {
        console.log('Error while trying to connect to database =>' + error);
        return null;
    }
}
