const GroupChat = require('../models/groupChats');
const User = require("../models/users");


const handleError = (res, err) => { res.status(500).json( {error: `${err}`} )}

const getAllGroupChats = (req, res) => {
    User.findById(req.query.id, { chats: { groupChats: 1 } })
        .then( (data) => {
            GroupChat.find({ '_id': { $in: data.chats.groupChats } }).then( (chats) => {
                res.status(200).json(chats);
            } ).catch( (err) => handleError(res, err) )
        })
        .catch( (err) => handleError(res, err) )
}

module.exports = {
    getAllGroupChats
};