import mongoose, {model} from 'mongoose';
import { IGroupChat } from "../types/types";

const Schema = mongoose.Schema;

const groupChatSchema: mongoose.Schema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    id_chats: String,
    nameChat: String,
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        require: true
    }],
    body_chats: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    }
});

export const GroupChat: mongoose.Model<IGroupChat> = model<IGroupChat>('group', groupChatSchema);
