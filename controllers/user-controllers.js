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

export const registration = (req, res) => {
    console.log(req);
    res.status(200)
}