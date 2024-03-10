const express = require('express');
const router = express.Router();

const {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    getInfoMyUser
} = require('../controllers/user-controllers');


router.get('/user', getInfoMyUser );

router.get('/users', getAllUsers );

// router.get('/users/:id', getUser );
//
// router.post('/users', addUser );
//
// router.patch('/users/:id', updateUser );

router.delete('/users/:id', deleteUser );


module.exports = router;