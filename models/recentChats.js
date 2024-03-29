import mongoose from 'mongoose';


const Schema = mongoose.Schema;
const recentChatSchema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        require: true
    }],
    body_chats: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    }
});

export const RecentChat = mongoose.model('recent', recentChatSchema);

