import { User } from "../models/users.js";

const handleError = (res, err) => { res.status(500).json( {error: `${err}`} )}

export const getAllUsers = (req, res) => {
    User.findById(req.params.id, { friends: 1}).then( currentUser => {
        User.find({ '_id': { $in: currentUser.friends } }, { nameUser: 1, email: 1, 
            job_title: 1, 
            phone: 1}).then( (friends) => {
            res.status(200).json(friends);
        } ).catch( (err) => handleError(res, err) )
    })
    .catch( (err) => handleError(res, err) )
}

export const singIn = (req, res) => {

    User.findOne( { email: req.body.email } ).then( user => {
        if (user) {
            user._doc.pass === req.body.pass 
            ? res.status(200).json(user) 
            : res.status(502).json({ message: 'Password is not valid' })
        } else { res.status(501).json({ message: 'User is not found' }) }
    }).catch( (err) => handleError(res, err) )
}

export const singUp = (req, res) => {
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

export const getProfileInfoByID = (req, res) => {
    User.findById(req.params.id).then( profile => {
        res.status(200).json(profile);
    }).catch( (err) => handleError(res, err) )
}

export const changeProfileName = (req, res) => {
    User.updateOne({_id: req.params.id}, {nameUser: req.body.newName}).then( profile => {
        res.status(200).json(profile);
    }).catch( (err) => handleError(res, err) )
}

export const changeProfileJobTitle = (req, res) => {
    User.updateOne({_id: req.params.id}, {job_title: req.body.newTitle}).then( profile => {
        res.status(200).json(profile);
    }).catch( (err) => handleError(res, err) )
}

export const subscription = (req, res) => {
    User.findById(req.params.id)
        .then( profile => {
            if (profile.subscription) {
                res.status(501).json(profile)
            } else {
                User.updateOne({_id: profile._id}, {subscription: true}).then( profile => {
                    res.status(201).json(profile)}).catch( (err) => handleError(res, err) )
            }
        })
        .catch( (err) => handleError(res, err) )
}

export const searchNewFriends = (req, res) => {
    User.find( { email: {'$regex': req.body.search},  _id: { $nin: [...req.body.friends, req.params.id] } }, {_id: 1, nameUser: 1, email: 1} ).then(users => {
        if (users.length) {
            res.status(200).json({
                entities: users,
                status: 1
            });
        } else res.status(501).json({
            message: 'Not found users for you',
            status: 0
        });
    })
}

