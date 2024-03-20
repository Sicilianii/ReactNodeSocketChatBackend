const GroupChat = require('../models/groupChats');
const User = require("../models/users");


const handleError = (res, err) => { res.status(500).json( {error: `${err}`} )}

const getAllGroupChats = (req, res) => {
    User.findById(req.params.id, { chats: { groupChats: 1 } })
        .then( (data) => {
            GroupChat.find({ '_id': { $in: data.chats.groupChats } }).then( (chats) => {
                res.status(200).json(chats);
            } ).catch( (err) => handleError(res, err) )
        })
        .catch( (err) => handleError(res, err) )
}

const getInfoGroupChat = (req, res) => {
    GroupChat.findById(req.params.id).then( (info) => {
        res.status(200).json(info);
    }).catch( (err) => handleError(res, err) )
}

module.exports = {
    getInfoGroupChat,
    getAllGroupChats
};

