import { Chats } from '../models/chat.js';
import { RecentChat } from '../models/recentChats.js';
import { GroupChat } from '../models/groupChats.js';

const handleError = (res, err) => { res.status(500).json( {error: `${err}`} )}

export const getMessagesRecentChat = (req, res) => {
    RecentChat.findById(req.params.id).then( (info) => {
        Chats.findById(info.body_chats)
            .then( (mess) => {
                res.status(200).json(mess) 
            } )
            .catch( (err) => handleError(res, err) )
    } ).catch( (err) => handleError(res, err) )
}

export const getMessagesGroupChat = (req, res) => {
    GroupChat.findById(req.params.id).then( (info) => {
        Chats.findById(info.body_chats)
            .then( (mess) => { res.status(200).json(mess) } )
            .catch( (err) => handleError(res, err) )
    } ).catch( (err) => handleError(res, err) )
}
