const RecentChat = require('../models/recentChats');
const User = require("../models/users");

const handleError = (res, err) => { res.status(500).json( {error: `${err}`} )}



// const createRecentChat = (req, res) => {}

const getAllRecentChat = (req, res) => {
    User.findById(req.params.id, { chats: { recentChats: 1 } })
    .then( (data) => {
        RecentChat.find({ '_id': { $in: data.chats.recentChats } }).then( (chats) => {
            res.status(200).json(chats);
        } ).catch( (err) => handleError(res, err) )
    })
    .catch( (err) => handleError(res, err) )
}

const delRecentChat = (req, res) => {
    RecentChat.findOneAndDelete(req.params.id)
        .then( (chat) => {
            res.status(200).json(chat)
        } )
        .then( (data) => {
            // This place for func delete Chat mess
            console.log(data)
        } )
        .catch( (err) => handleError(res, err) )
}

// const updateRecentChat = (req, res) => {}

module.exports = {
    getAllRecentChat,
    // createRecentChat,
    delRecentChat,
};