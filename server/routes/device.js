const express = require('express');
// Requiring express router
const router = express.Router();

const Device = require('../models/devices');
const User = require('../models/users');
const Controler = require('../models/controls');




// get all devices
router.get("/", (req, res) => {

    Device.getAllDevices((err, devices) => {
        if (err)
            res.json({
                success: false,
                msg: err
            });
        else
            res.json({
                success: true,
                msg: devices
            });
    });
});


//POST for adding a new device
router.post("/", (req, res) => {
    if (!req.body.name || !req.body.userID || !req.body.fields || !req.body.controls)
        res.json({
            success: false,
            msg: 'incomplete data'
        });
    else {
        User.getUserByID(req.body.userID, (err, recUser) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'invalid user'
                });
            else {
                let device = {
                    name: req.body.name,
                    userID: req.body.userID,
                    fields: req.body.fields,
                    controls: req.body.controls,
                }
                Device.addDevice(device, (err) => {
                    if (err)
                        res.json({
                            success: false,
                            msg: err
                        });
                    else
                        res.json({
                            success: true,
                            msg: 'device added'
                        });
                });

            }
        })
    }
});

// Update device
router.put("/", (req, res) => {
    if (!req.body._id || !req.body.fields || !req.body.controls)
        res.json({
            success: false,
            msg: 'incomplete data'
        });
    else {
        device = {
            _id: req.body._id,
            fields: req.body.fields,
            controls: req.body.controls,
        }
        Device.updateDevice(device, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: err
                });
            else
                res.json({
                    success: true,
                    msg: 'device update'
                });
        })
    }
});

// Delete for Device
router.delete('/', (req, res) => {
    if (!req.body._id)
        res.json({
            success: false,
            msg: 'incomplete data'
        });
    else
        Device.removeDevice(req.body._id, (err) => {
            if (err)
                res.json({
                    success: false,
                    msg: err
                });
            else {
                Controler.removeControlersByDeviceID(req.body._id, (err) => {
                    if (err)
                    res.json({
                        success: false,
                        msg: err
                    });
                    else
                    res.json({
                        success: true,
                        msg: "Device Deleted"
                    });
                })
            }

        })
})

// Exporting the router as a module
module.exports = router;