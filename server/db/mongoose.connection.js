const mongoose = require('mongoose');
const { NODE_ENV, DB_REMOTE } = process.env;

let uri;

if (NODE_ENV === 'development') {
    const { DB_HOST, DB_PORT, DB_NAME } = process.env;
    uri = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`
}
else uri = DB_REMOTE;

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};

let instance;

const connect = async () => {
    if (!instance) {
        instance = await mongoose.connect(uri, options);
        console.log('mongoDB is connected');
    }
}

module.exports = { connect };