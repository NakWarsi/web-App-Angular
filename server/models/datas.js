const mongoose = require('mongoose');

// Defining the schema for Data
const DataSchema = mongoose.Schema({

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
const Data = module.exports = mongoose.model('Data', DataSchema);

// Method to get all the Data

module.exports.getAllData = function (callback) {
    Data.find(callback);
};

module.exports.addData = function (data, callback) {
    Data.create(data, callback);
};

module.exports.getDataByDeviceID = function (deviceID, callback) {
    let query = {
        deviceID: deviceID
    }
    Data.find(query, callback)
}








