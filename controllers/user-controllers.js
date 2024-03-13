const User = require("../models/users");

const handleError = (res, err) => { res.status(500).json( {error: `${err}`} )}


const getInfoMyUser = (req, res) => {
    User.findById(req.query.id, { _id: 1, nameUser: 1}).then( (userData) => {
        res.status(200).json(userData);
    })
    .catch( (err) => handleError(res, err) )
}

const getAllUsers = (req, res) => {
    User.findById(req.params.id, { friends: 1}).then( currentUser => {
        User.find({ '_id': { $in: currentUser.friends } }, { nameUser: 1}).then( (friends) => {
            res.status(200).json(friends);
        } ).catch( (err) => handleError(res, err) )
    })
    .catch( (err) => handleError(res, err) )
}

// const getUser = (req, res) => {
//     User.findById(req.params.id).then( (user) => {
//         res.status(200).json(user);
//     }).catch( (err) => handleError(res, err) )
// }
//
// const addUser = (req, res) => {
//     const user = new User(req.body);
//     user.save().then( (result) => {
//         res.status(200).json(result);
//     }).catch( (err) => handleError(res, err) )
// }
//
// const updateUser = (req, res) => {
//     User.findOneAndUpdate(req.params.id, req.body).then( (result) => {
//         res.status(200).json(result);
//     }).catch( (err) => handleError(res, err) )
// }


const deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id).then( (result) => {
        res.status(200).json(result);
    }).catch( (err) => handleError(res, err) )
}


module.exports = {
    getInfoMyUser,
    getAllUsers,
    // getUser,
    // addUser,
    // updateUser,
    deleteUser
};