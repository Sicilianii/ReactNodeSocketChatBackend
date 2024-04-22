import { Chats } from '../models/messages.model';
import { RecentChat } from '../models/recent.model';
import { GroupChat } from '../models/group.model';
import { Request, Response } from "express";

const handleError = (res: Response, err: Error | string) => { res.status(500).json( {error: `${err}`} )}


export const getMessagesRecentChat = (req: Request, res: Response) => {
    RecentChat.findById(req.params.id).then( (info) => {
        Chats.findById(info?.body_chats)
            .then( (mess) => {
                res.status(200).json(mess)
            } )
            .catch( (err) => handleError(res, err) )
    } ).catch( (err) => handleError(res, err) )
}

export const getMessagesGroupChat = (req: Request, res: Response) => {
    GroupChat.findById(req.params.id).then( (info) => {
        Chats.findById(info?.body_chats)
            .then( (mess) => { res.status(200).json(mess) } )
            .catch( (err) => handleError(res, err) )
    } ).catch( (err) => handleError(res, err) )
}
