import { RecentChat } from '../models/recent.model';
import { User } from "../models/profile.model";
import { Request, Response } from "express";


const handleError = (res: Response, err: Error | string) => { res.status(500).json( {error: `${err}`} )}

export const getAllRecentChat = (req: Request, res: Response) => {
    User.findById(req.params.id, { chats: { recentChats: 1 } }).lean()
        .then( (data) => {
            RecentChat.find({ '_id': { $in: data?.chats?.recentChats } }).lean().then( (chats) => {
                res.status(200).json(chats);
            } ).catch( (err) => handleError(res, err) )
        })
        .catch( (err) => handleError(res, err) )
};

export const getInfoRecentChat = (req: Request, res: Response) => {
    RecentChat.findById(req.params.id).then( info => {
        res.status(200).json(info);
    }).catch( (err) => handleError(res, err) )
}
