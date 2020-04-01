const express = require('express');
const app = express();
const PORT = 3005;
const mongoose = require('mongoose');
const cors = require('cors');
const usersController = require('./controllers/users.js');

// mongoose error / disconnection
mongoose.connection.on('error', err => console.log(err.message + 'is Mongod not running'));
mongoose.connection.on('diconnected', () => console.log('mongo disconnect'));

// mongoose connection
mongoose.connect('mongodb://localhost:27017/cryptowatch', {useNewParser: true})
mongoose.connection.once('open', ()=> {
    console.log('connected to mongoose...');
})

// middleware
app.use(express.json());

// cors middleware
const whitelist = ['http://localhost:3000'];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors());

// Mount the routes from users controller
app.use('/crypto', usersController)


// web server
app.listen(PORT, () => {
    console.log('server running on port:',PORT);
})