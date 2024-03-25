import express from "express";
import { createServer } from 'node:http';
import mongoose from 'mongoose';
import { router as userRouter } from './routes/user-routes.js';
import { router as mainRouter } from './routes/main-routes.js';
import { router as groupRouter } from './routes/groupChats-routes.js';
import { router as recentRouter } from './routes/recentChat-routes.js';


const app = express();
app.use(express.json());
app.use(userRouter);
app.use(mainRouter);
app.use(groupRouter);
app.use(recentRouter);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // res.setHeader('Access-Control-Allow-Credentials', true);
    // next();
});


const server = createServer(app);


const URL = 'mongodb://admin:GIH%269zBS@lipascadmeb.beget.app/';
mongoose
    .connect(URL)
    .then( () => { console.log(`Connected to MongoDB`) } )
    .catch( (err) => { console.log(`DB connection error ${err}`) });


