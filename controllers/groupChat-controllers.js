import { GroupChat } from '../models/groupChats.js';
import { User } from "../models/users.js";
import { Chats } from '../models/chat.js';

const handleError = (res, err) => { res.status(500).json( {error: `${err}`} )}

export const getAllGroupChats = (req, res) => {
    User.findById(req.params.id, { chats: { groupChats: 1 } })
        .then( (data) => {
            GroupChat.find({ '_id': { $in: data.chats.groupChats } }).then( (chats) => {
                res.status(200).json(chats);
            } ).catch( (err) => handleError(res, err) )
        })
        .catch( (err) => handleError(res, err) )
}

export const getInfoGroupChat = (req, res) => {
    GroupChat.findById(req.params.id).then( (info) => {
        res.status(200).json(info);
    }).catch( (err) => handleError(res, err) )
}

export const createNewChat = (req, res) => {
    GroupChat.find({nameChat: req.body.name}).then( (chatFind) => {
        if(chatFind.length) {
            res.status(503).json({message: 'A chat with this NAME is already registered'})
        } else {
            Chats.create({ body_chats: [] }).then( (chat) => {
                GroupChat.create({
                    nameChat: req.body.name,
                    users: req.body.users,
                    body_chats: chat._id
                }).then( (groupChat) => {
                    User.updateMany({ '_id': { $in: req.body.users } }, { $push: { "chats.groupChats": groupChat._id } } ).then( data => res.status(201).json({chat: chat}))
                } )
            })
        }
    })

    // GroupChat
}


