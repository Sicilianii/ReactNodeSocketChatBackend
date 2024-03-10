const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const usersSchema = new Schema({
    id: {
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
    friends: [mongoose.Schema.Types.ObjectId]
});

const User = mongoose.model('User', usersSchema);

module.exports = User;