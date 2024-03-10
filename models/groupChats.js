const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupChatSchema = new Schema({
    id: {
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

const GroupChat = mongoose.model('group', groupChatSchema);

module.exports = GroupChat;