import mongoose, {model} from 'mongoose';
import { IRecentChat } from "../types/types";


const Schema = mongoose.Schema;
const recentChatSchema: mongoose.Schema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    users: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                require: true
            },
            nameUser: String
        }
    ],
    body_chats: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    }
});

export const RecentChat: mongoose.Model<IRecentChat> = model<IRecentChat>('recent', recentChatSchema);
