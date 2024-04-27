import { User } from "../models/profile.model";
import { Request, Response } from "express";
import {IUser} from "../types/types";

const handleError = (res: Response, err: Error | string) => { res.status(500).json( {error: `${err}`} )}

export const getAllUsers = (req: Request, res: Response) => {
    User.findById(req.params.id, { friends: 1}).then( (currentUser) => {
        User.find({ '_id': { $in: currentUser?.friends } }, { nameUser: 1, email: 1,
            job_title: 1,
            phone: 1}).then( (friends) => {
            res.status(200).json(friends);
        } ).catch( (err) => handleError(res, err) )
    })
        .catch( (err) => handleError(res, err) )
}

export const singIn = (req: Request, res: Response) => {

    User.findOne( { email: req.body.email } ).then( user => {
        if (user && user.pass === req.body.pass) {
            User.find({ '_id': { $in: user.friends } }, {
                _id: 1,
                nameUser: 1,
                email: 1,
                job_title: 1,
                phone: 1
            }).then( (list : IUser[]) => {
                res.status(200).json({...user, friends: list})
            })

            // user.pass === req.body.pass
            //     ? res.status(200).json(user)
            //     : res.status(502).json({ message: 'Password is not valid' })
        } else { res.status(501).json({ message: 'User is not found' }) }
    }).catch( (err) => handleError(res, err) )
}

export const singUp = (req: Request, res: Response) => {
    User.findOne( { email: req.body.email } ).then(user => {
        if(!user) {
            User.create({
                "pass": req.body.pass,
                "nameUser": req.body.name,
                "chats": {
                    "recentChats": [],
                    "groupChats": []
                },
                "friends": [],
                "email": req.body.email,
                "job_title": "Unspecified",
                "phone": "Unspecified"
            }).then(newUser => {
                res.status(201).json(newUser);
            }).catch( (err) => handleError(res, err) )
        } else {
            res.status(503).json({message: 'A user with this e-mail address is already registered'})
        }
    }).catch(e => console.log(e))
}

export const getProfileInfoByID = (req: Request, res: Response) => {
    User.findById(req.params.id).then( profile => {
        res.status(200).json(profile);
    }).catch( (err) => handleError(res, err) )
}

export const changeProfileName = (req: Request, res: Response) => {
    User.updateOne({_id: req.params.id}, {nameUser: req.body.newName}).then( profile => {
        res.status(200).json(profile);
    }).catch( (err) => handleError(res, err) )
}

export const changeProfileJobTitle = (req: Request, res: Response) => {
    User.updateOne({_id: req.params.id}, {job_title: req.body.newTitle}).then( profile => {
        res.status(200).json(profile);
    }).catch( (err) => handleError(res, err) )
}

export const subscription = (req: Request, res: Response) => {
    User.findById(req.params.id)
        .then( profile => {
            if (profile?.subscription) {
                res.status(501).json(profile)
            } else {
                User.updateOne({_id: profile?._id}, {subscription: true}).then( profile => {
                    res.status(201).json(profile)}).catch( (err) => handleError(res, err) )
            }
        })
        .catch( (err) => handleError(res, err) )
}

export const searchNewFriends = (req: Request, res: Response) => {
    User.find( { email: {'$regex': req.body.search},  _id: { $nin: [...req.body.friends, req.params.id] } }, {_id: 1, nameUser: 1, email: 1} ).then(users => {
        if (users.length) {
            res.status(200).json({
                entities: users,
                status: 1
            });
        } else res.status(501).json({
            message: 'Not found users for you.',
            status: 0
        });
    })
}

export const squabble = (req: Request, res: Response) => {
    const {myID, idFriend} = req.params;

    User.findByIdAndUpdate(myID, { $pull: { "friends": idFriend } } ).then( result => {
        User.findByIdAndUpdate(idFriend, { $pull: { "friends": myID } }).then( resultMore => {
            if (result && resultMore) { res.status(201).json({
                message: 'You chased that bum away.',
                status: 1
            });
            } else {
                res.status(501).json({
                    message: "You couldn't chase that bum away.",
                    status: 0
                });
            }
        } )
    } )
}

export const befriend = (req: Request, res: Response) => {
    const {myID, idFriend} = req.params;

    User.findByIdAndUpdate(myID, { $push: { "friends": idFriend } }).then( result => {
        User.findByIdAndUpdate(idFriend, { $push: { "friends": myID } }).then( resultMore => {
            if (result && resultMore) { res.status(201).json({
                message: 'You have new friend.',
                status: 1
            });
            } else {
                res.status(501).json({
                    message: "He's bad.",
                    status: 0
                });
            }
        } )
    } )

}
