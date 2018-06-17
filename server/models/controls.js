const mongoose = require('mongoose');

// Defining the schema for Control
const ControlSchema = mongoose.Schema({

    deviceID: {
        type: String,
        required: true
    },
    data: {
        type: Array,
        default: []
    },
    time: {
        type: Number,
        default: new Date()
    }
});

// Naming and exporting  the Data mongoose model
const Control = module.exports = mongoose.model('Control', ControlSchema);

// Method to get all the Data

module.exports.getAllControls = function (callback) {
    Control.find(callback);
};

module.exports.addControl = function (control, callback) {
    Control.create(control, callback);
};

module.exports.getControlByDeviceID = function (deviceID, callback) {
    let query = {
        deviceID: deviceID
    }
    Control.find(query, callback)
}
module.exports.updateControl = function (control, callback) {
    let query = {
        deviceID: control.deviceID
    }
    let update = {
        data: control.data,
        time: new Date()
    }
    Control.findOneAndUpdate(query, update, callback)
}
module.exports.removeControlersByDeviceID = function (deviceID, callback) {
    let query = {
        deviceID: deviceID
    }
    Device.remove(query, callback)
}






