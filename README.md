# DevNet

### Full Stack Demo Project

DevNet is a Developers social network.

Link: https://hungry-volhard-95003b.netlify.com/

The client side deployed with netlify.
The server side deployed with ZEIT Now.

### Tech

DevNet uses a number of open source projects to work properly:

- [ReactJS] - JavaScript library for building user interfaces
- [Bootstrap] - front-end framework for faster and easier web development
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework
- [Passport.js]- Express-compatible authentication middleware for Node.js
- [hapijs/joi] - Object schema description language and validator for JavaScript objects

### Installation

DevNet requires [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) to run on your machine.

```bash
# Install dependencies for server
$ cd ./server
$ npm install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000

You will need to create a .env file in the server folder with


NODE_ENV=development
DB_HOST=localhost
DB_PORT=27017
DB_NAME=devnet

LOCAL_PORT=5000

APP_SECRET=YOUR_SECRET_KEY_FOR_SERVER
TOKEN_EXPIRY=3600

```
