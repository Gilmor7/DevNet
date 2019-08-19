const app = require('./server/server');
const { LOCAL_PORT } = process.env

// INITIALIZE SERVER AND DATABASE
const init = async () => {
    await app.listen(LOCAL_PORT);
    console.log('server listening on port: ' + LOCAL_PORT);
}
init().catch(err => console.log(err));