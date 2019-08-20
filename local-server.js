const app = require('./server/server');
const cors = require('cors');
const { LOCAL_PORT } = process.env

// add CORS support to my server
app.use(cors());

// INITIALIZE SERVER AND DATABASE
const init = async () => {
    await app.listen(LOCAL_PORT);
    console.log('server listening on port: ' + LOCAL_PORT);
}
init().catch(err => console.log(err));