import express, {Application} from "express";
import Serv from "./index";
import { Server } from "socket.io";
import mongoose from 'mongoose';
import crypto from 'crypto'
import {IMessages} from "./types/types";

const URL: string = 'mongodb://admin:GIH%269zBS@lipascadmeb.beget.app/';
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
const app: Application = express();
const serv: Serv = new Serv(app);


mongoose
    .connect(URL)
    .then( () => { console.log(`Connected to MongoDB`) } )
    .catch( (err) => { console.log(`DB connection error ${err}`) });


const server = app.listen(PORT, () => {
      console.log(`Listening at port: ${PORT}`)
    }).on("error", (err: any) => {
      if (err.code === "EADDRINUSE") {
        console.log("Error: address already in use");
      } else { console.log(err) }
    });

const io = new Server(server);

io.on('connection', (socket)=> {

    console.log(`User ${socket.id} connected`)

    socket.on('leaveConnection', (infoChat) => {
        if (Array.from(socket.rooms).length) {
            Array.from(socket.rooms).forEach(el => socket.leave(el))
            console.log(socket.rooms);
            socket.emit('NewState');
            socket.join(infoChat);
        }
    })

    socket.on('newConnection', (infoChat, user) => {
        const {name, id} = user;

        console.log(`User ${name} connected`)

        socket.on('SendNewMessage', (newMess: IMessages) => {
            console.dir(newMess);
            socket.to(infoChat).emit('MailingMessages', {...newMess, idMessage: crypto.randomUUID()});
        });

        console.dir(Array.from(socket.rooms));
    });

    // disconnect from all rooms

    // If user disconnected
    socket.once('disconnect', ()=> {
        console.log(`User ${socket.id} disconnected`)
    })
})
