const Chats = require('../models/chat');
const RecentChat = require('../models/recentChats');
const GroupChat = require('../models/groupChats');

const handleError = (res, err) => { res.status(500).json( {error: `${err}`} )}

const getMessagesRecentChat = (req, res) => {
    RecentChat.findById(req.params.id).then( (info) => {
        Chats.findById(info.body_chats)
            .then( (mess) => { res.status(200).json(mess) } )
            .catch( (err) => handleError(res, err) )
    } ).catch( (err) => handleError(res, err) )
}

const getMessagesGroupChat = (req, res) => {
    GroupChat.findById(req.params.id).then( (info) => {
        Chats.findById(info.body_chats)
            .then( (mess) => { res.status(200).json(mess) } )
            .catch( (err) => handleError(res, err) )
    } ).catch( (err) => handleError(res, err) )
}

module.exports = {
    getMessagesRecentChat,
    getMessagesGroupChat
};