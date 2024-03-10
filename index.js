const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const userRouter = require('./routes/user-routes');
const mainRouter = require('./routes/main-routes');
const groupRouter = require('./routes/groupChats-routes');
const recentRouter = require('./routes/recentChat-routes');


const app = express();
app.use(express.json());
app.use(userRouter);
app.use(mainRouter);
app.use(groupRouter);
app.use(recentRouter);


const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {}
});

const URL = 'mongodb://admin:GIH%269zBS@lipascadmeb.beget.app/';
mongoose.connect(URL)
    .then( () => { console.log(`Connected to MongoDB`) } )
    .catch( (err) => { console.log(`DB connection error ${err}`) })

server.listen(3001, () => {
    console.log('index listen 3001 port ...')
});



io.on('connection', (socket) => {
    console.log('a user connect');

    socket.on('chat message', (msg) => {
        console.log(msg)
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

