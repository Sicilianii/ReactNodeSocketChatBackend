import { Chats } from '../models/messages.model';
import { RecentChat } from '../models/recent.model';
import { GroupChat } from '../models/group.model';
import { Request, Response } from "express";
import {User} from "../models/profile.model";
import {IUser} from "../types/types";


const handleError = (res: Response, err: Error | string) => { res.status(500).json( {error: `${err}`} )}


export const getMessagesRecentChat = (req: Request, res: Response) => {
    RecentChat.findById(req.params.id).lean().then( (info) => {
        User.find( { '_id': { $in: info?.users }}, { nameUser: 1, _id: 1,email: 1, job_title: 1, phone: 1 }).lean().then( (arrUsers: IUser[])  => {
            Chats.findById(info?.body_chats).lean()
                .then( (mess) => { res.status(200).json({...info, users: arrUsers, body_chats: mess}) } )
                .catch( (err) => handleError(res, err) )
        })
    } ).catch( (err) => handleError(res, err) )
}

export const getMessagesGroupChat = (req: Request, res: Response) => {
    GroupChat.findById(req.params.id).lean().then( (info) => {
        User.find( { '_id': { $in: info?.users }}, { nameUser: 1, _id: 1,email: 1, job_title: 1, phone: 1 }).lean().then( (arrUsers: IUser[])  => {
            Chats.findById(info?.body_chats).lean()
                .then( (mess) => { res.status(200).json({...info, users: arrUsers, body_chats: mess}) } )
                .catch( (err) => handleError(res, err) )
        })
    } ).catch( (err) => handleError(res, err) )
}
