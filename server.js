const express = require('express');
const db = require('./db/mongoose.connection');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const { error_handler, not_found } = require('./middlewares/error.handler');


// REQUIRE ROUTE FILES
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const PORT = process.env.port || 5000;
const app = express();

// add CORS support to my server
app.use(cors());

//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//initialize passport for authentication - middleware
app.use(passport.initialize());

//passport config (setting strategies on the passport instance for protecting routes)
require('./config/passport')(passport)

// USE ROUTES
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// central error handling
app.use(error_handler);

//when no routes were matched...
app.use('*', not_found);

// INITIALIZE SERVER AND DATABASE
const init = async () => {
    await db.connect();
    await app.listen(PORT);
    console.log('server listening on port: ' + PORT);
}
init().catch(err => console.log(err));
