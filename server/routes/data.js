const express = require('express');
// Requiring express router
const router = express.Router();
const Device = require('../models/devices');
const Data = require('../models/datas');

router.get("/", (req, res) => {
    Data.getAllData((err, datas) => {
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

// POST data

router.post('/', (req, res) => {
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
                    msg: err
                });
            else {
                if (!recDevice)
                    res.json({
                        success: false,
                        msg: 'invalid device'
                    });
                else {
                    let data = {
                        deviceID: req.body.deviceID,
                        data: req.body.data
                    }
                    Data.addData(data, (err) => {
                        if (err)
                            res.json({
                                success: false,
                                msg: err
                            });
                        else
                            res.json({
                                success: true,
                                msg: 'Data Added'
                            });
                    })
                }
            }
        })
    }
});

// POST - get data by deviceID
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
                Data.getDataByDeviceID(req.body.deviceID, (err, data) => {
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