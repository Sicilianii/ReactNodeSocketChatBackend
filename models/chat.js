const mongoose = require('mongoose');

const Schema =  mongoose.Schema;

const chatSchema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    body_chats: [
        {
            id: {
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

const Chats = mongoose.model('chat', chatSchema);

module.exports = Chats;