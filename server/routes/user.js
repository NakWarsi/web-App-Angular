const express = require('express');
// Requiring express router
const router = express.Router();
const User = require('../models/users');
const Device = require('../models/devices');


// Get request for getting all the users
router.get("/", (req, res) => {
    User.getAllUsers((err, users) => {
        if (err)
            res.json({
                success: false,
                msg: err
            });
        else
            res.json({
                success: true,
                msg: users
            });
    });
});

// POST for adding a user
router.post('/', (req, res) => {
    if (!req.body.name || !req.body.userName || !req.body.password)
        res.json({
            success: false,
            msg: 'Incomplete data'
        });
    else {
        User.getUserByUserName(req.body.userName, (err, recUser) => {
            if (err)
                res.json({
                    success: false,
                    msg: err
                });
            else {
                if (recUser) {
                    res.json({
                        success: false,
                        msg: 'User already exists'
                    });
                } else {
                    let user = {
                        name: req.body.name,
                        userName: req.body.userName,
                        password: req.body.password
                    }
                    User.addUser(user, (err) => {
                        if (err)
                            res.json({
                                success: false,
                                msg: err
                            });
                        else
                            res.json({
                                success: true,
                                msg: 'Added new User'
                            });
                    });
                }

            }

        })
    }

});

// POST for login
router.post('/login', (req, res) => {
    if (!req.body.userName || !req.body.password)
        res.json({
            success: false,
            msg: 'Incomplete data'
        });
    else {
        let user = {
            userName: req.body.userName,
            password: req.body.password
        }
        User.getUserByUserName(user.userName, (err, recUser) => {
            if (err)
                res.json({
                    success: false,
                    msg: err
                });
            else {
                if (!recUser) {
                    res.json({
                        success: false,
                        msg: 'User does not exists'
                    });
                } else {
                    if (user.password != recUser.password)
                        res.json({
                            success: false,
                            msg: 'Wrong Password'
                        });
                    else res.json({
                        success: true,
                        msg: {
                            name: recUser.name,
                            userName: recUser.userName,
                            _id: recUser._id
                        }
                    });
                }

            }
        })
    }
});

//POST for updating password
router.put('/', (req, res) => {
    if (!req.body.userName || !req.body.password || !req.body.newPassword)
        res.json({
            success: false,
            msg: 'Incomplete data'
        });
    else {
        User.getUserByUserName(req.body.userName, (err, recUser) => {
            if (err)
                res.json({
                    success: false,
                    msg: err
                });
            else {
                if (!recUser) {
                    res.json({
                        success: false,
                        msg: 'User does not exists'
                    });
                } else {
                    if (req.body.password != recUser.password)
                        res.json({
                            success: false,
                            msg: 'Wrong Password'
                        });
                    else {
                        recUser.password = req.body.newPassword
                        User.updatePassword(recUser, (err) => {
                            if (err)
                                res.json({
                                    success: false,
                                    msg: err
                                });
                            else res.json({
                                success: true,
                                msg: 'Password Updated'
                            });
                        })
                    }
                }

            }
        })
    }
})

// POST for delete

router.delete('/', (req, res) => {
    if (!req.body.userName || !req.body.password)
        res.json({
            success: false,
            msg: 'Incomplete data'
        });
    else {
        User.getUserByUserName(req.body.userName, (err, recUser) => {
            if (err)
                res.json({
                    success: false,
                    msg: err
                });
            else {
                if (!recUser)
                    res.json({
                        success: false,
                        msg: 'User does not exists'
                    });
                else {
                    if (req.body.password != recUser.password)
                        res.json({
                            success: false,
                            msg: 'Wrong Password'

                        });

                    else {

                        User.removeUser(recUser._id, (err) => {
                            if (err)
                                res.json({
                                    success: false,
                                    msg: err
                                });
                            else {
                                Device.removeDevicesByUserID(recUser._id, (err) => {
                                    if (err)
                                        res.json({
                                            success: false,
                                            msg: err
                                        });
                                    else
                                        res.json({
                                            success: true,
                                            msg: 'User Deleted'
                                        });
                                });
                            }
                        });
                    }
                }
            }
        });
    }

});
// Exporting the router as a module
module.exports = router;