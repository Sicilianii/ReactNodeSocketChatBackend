import { RecentChat } from '../models/recentChats.js';
import { User } from "../models/users.js";

const handleError = (res, err) => { res.status(500).json( {error: `${err}`} )}

export const getAllRecentChat = (req, res) => {
    User.findById(req.params.id, { chats: { recentChats: 1 } })
    .then( (data) => {
        RecentChat.find({ '_id': { $in: data.chats.recentChats } }).then( (chats) => {
            res.status(200).json(chats);
        } ).catch( (err) => handleError(res, err) )
    })
    .catch( (err) => handleError(res, err) )
};

export const getInfoRecentChat = (req, res) => {
    RecentChat.findById(req.params.id).then( info => {
        res.status(200).json(info);
    }).catch( (err) => handleError(res, err) )
}
