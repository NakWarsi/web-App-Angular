const mongoose = require('mongoose');
const Control = require('./controls');
// Defining the schema for Devices
const DeviceSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    fields: {
        type: Array,
        default: []
    },
    controls: {
        type: Array,
        default: []
    }
});

// Naming and exporting  the Device mongoose model
const Device = module.exports = mongoose.model('Device', DeviceSchema);

// Method to get all the Devices

module.exports.getAllDevices = function (callback) {
    Device.find(callback);
};

module.exports.addDevice = function (device, callback) {
    Device.create(device, callback);
};

module.exports.getDevicesByUserID = function (userID, callback) {
    let query = {
        userID: userID
    }
    Device.find(query, callback)
}

module.exports.getDeviceByID = function (id, callback) {
    Device.findById(id, callback);
}
module.exports.updateDevice = function (device, callback) {

    let update = {
        fields: device.fields,
        controls: device.controls
    }
    Device.findByIdAndUpdate(device._id, update, callback);
}

module.exports.removeDevice = function (id, callback) {
    Device.findByIdAndRemove(id, callback);
}

module.exports.removeDevicesByUserID = function (userID, callback) {
    let query = {
        userID: userID
    }
    Device.find(query, (err, devices) => {
        devices.forEach((device) => {
            Control.removeControlersByDeviceID(device._id)
        })
        Device.remove(query, callback)
    })

}









