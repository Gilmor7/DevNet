const express = require('express');
const db = require('./db/mongoose.connection');

// REQUIRE ROUTE FILES
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const PORT = process.env.port || 5000;
const app = express();

app.get('/', (req, res) => {
    res.send('HomePage');
});

// USE ROUTES
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// INITIALIZE SERVER AND DATABASE
const init = async () => {
    await db.connect();
    await app.listen(PORT);
    console.log('server listening on port: ' + PORT);
}
init().catch(err => console.log(err));
