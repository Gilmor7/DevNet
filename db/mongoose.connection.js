const mongoose = require('mongoose');

const uri = `mongodb+srv://gilmor7:blitz0549409597@gmcluster-wmkj2.mongodb.net/test?retryWrites=true&w=majority`;

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

const connect = async () => {
    await mongoose.connect(uri, options);
    console.log('mongoDB is connected');
}

module.exports = { connect };