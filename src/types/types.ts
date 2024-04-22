import mongoose from "mongoose";

export interface IUser {
    _id: mongoose.Types.ObjectId,
    nameUser?: string
    chats?: {
        recentChats?: IRecentChat[],
        groupChats?: IGroupChat[]
    },
    friends?: IUser[],
    email?: string,
    pass?: string,
    job_title?: String,
    phone?: String,
    subscription?: Boolean
}

export interface IRecentChat {
    _id: mongoose.Types.ObjectId,
    users?: IUser[],
    body_chats?: IBodyChats
}

export interface IGroupChat {
    _id: mongoose.Types.ObjectId,
    nameChat?: string,
    users?: IUser[],
    body_chats?: IBodyChats
}

export interface IBodyChats {
    _id: mongoose.Types.ObjectId,
    body_chats?: IMessages[]
}

export interface IMessages {
    users_id: IUser,
    time_mess: Date,
    body_mess: string
}