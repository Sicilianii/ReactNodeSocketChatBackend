import express from 'express';
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from 'url';
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

const URL = 'mongodb://admin:GIH%269zBS@lipascadmeb.beget.app/';
mongoose
    .connect(URL)
    .then( () => { console.log(`Connected to MongoDB`) } )
    .catch( (err) => { console.log(`DB connection error ${err}`) });


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'public')));

const expressServer = app.listen(PORT, () => {
    console.log(`Listening port on : ${PORT}`);
});

const io = new Server(expressServer, {
    cors: {
        origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:3001","http://localhost:63342"]
    }
});