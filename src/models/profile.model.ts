import mongoose, { model } from 'mongoose';
import {IUser} from "../types/types";

const Schema = mongoose.Schema;
const usersSchema: mongoose.Schema = new Schema<IUser>({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    nameUser: {
        type: String,
        require: true
    },
    chats: {
        recentChats: [mongoose.Schema.Types.ObjectId],
        groupChats: [mongoose.Schema.Types.ObjectId]
    },
    friends: [mongoose.Schema.Types.ObjectId],
    email: {
        type: String,
        require: true
    },
    pass: {
        type: String,
        require: true
    },
    job_title: String,
    phone: String,
    subscription: Boolean
});

export const User: mongoose.Model<IUser> = model<IUser>('users', usersSchema);