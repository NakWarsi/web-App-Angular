const express = require('express');
// Requiring express router
const router = express.Router();
const Device = require('../models/devices');
const Control = require('../models/controls');

router.get("/", (req, res) => {
    Control.getAllControls((err, datas) => {
        if (err)
            res.json({
                success: false,
                msg: err
            });
        else
            res.json({
                success: true,
                msg: datas
            });
    })
});

router.post("/", (req, res) => {
    if (!req.body.deviceID || !req.body.data)
        res.json({
            success: false,
            msg: 'incomplete data'
        });
    else {
        Device.getDeviceByID(req.body.deviceID, (err, recDevice) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'invalid device'
                });
            else {
                Control.getControlByDeviceID(req.body.deviceID, (err, recControls) => {
                    if (err)
                        res.json({
                            success: false,
                            msg: err
                        });
                    else {
                        let control = {
                            deviceID: req.body.deviceID,
                            data: req.body.data
                        }
                        if (recControls.length == 0) {

                            Control.addControl(control, (err) => {
                                if (err)
                                    res.json({
                                        success: false,
                                        msg: err
                                    });
                                else
                                    res.json({
                                        success: true,
                                        msg: 'control Added'
                                    });
                            })
                        } else {
                            Control.updateControl(control, (err) => {
                                if (err)
                                    res.json({
                                        success: false,
                                        msg: err
                                    });
                                else
                                    res.json({
                                        success: true,
                                        msg: 'control updated'
                                    });
                            })
                        }

                    }

                })
            }
        })
    }
})
router.post('/byID', (req, res) => {
    if (!req.body.deviceID)
        res.json({
            success: false,
            msg: 'incomplete data'
        });
    else {
        Device.getDeviceByID(req.body.deviceID, (err, device) => {
            if (err)
                res.json({
                    success: false,
                    msg: 'Invalid Device'
                });
            else {
                Control.getControlByDeviceID(req.body.deviceID, (err, data) => {
                    if (err)
                        res.json({
                            success: false,
                            msg: err
                        });
                    else
                        res.json({
                            success: true,
                            msg: data
                        });
                })
            }
        })
    }
});
// Exporting the router as a module
module.exports = router;