import mongoose, {model} from 'mongoose';
import { IBodyChats } from "../types/types";

const Schema =  mongoose.Schema;

const chatSchema: mongoose.Schema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    body_chats: [
        {
            users_id: {
                type: mongoose.Schema.Types.ObjectId,
                require: true
            },
            time_mess: {
                type: String,
                require: true
            },
            body_mess: {
                type: String,
                require: true
            }
        }
    ]
});

export const Chats: mongoose.Model<IBodyChats> = model<IBodyChats>('chat', chatSchema);
