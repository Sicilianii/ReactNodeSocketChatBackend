const Chats = require('../models/chat');
const RecentChat = require('../models/recentChats');
const GroupChat = require('../models/groupChats');
const User = require("../models/users");

const handleError = (res, err) => { res.status(500).json( {error: `${err}`} )}


const getFullInfo = (req, res) => {
    User.findById(req.query.id).then( (user) => {
        RecentChat.find({ '_id': { $in: user.chats.recentChats } }).then( (recentChat) => {
            GroupChat.find({ '_id': { $in: user.chats.groupChats } }).then( (groupChat) => {
                let DATA = {...user._doc}
                DATA.chats.recentChats = recentChat;
                DATA.chats.recentChats = groupChat;
                res.status(200).json(DATA);
            }).catch( (err) => handleError(res, err) )
        } ).catch( (err) => handleError(res, err) )
    }).catch( (err) => handleError(res, err) )
}

module.exports = {
    getFullInfo
};