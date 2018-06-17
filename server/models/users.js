const mongoose = require('mongoose');

// Defining the schema for Users
const UserSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    }
});

// Naming and exporting  the user mongoose model
const User = module.exports = mongoose.model('User', UserSchema);

// Method to get all the users

module.exports.getAllUsers = function (callback) {
    User.find(callback);
};

module.exports.addUser = function (user, callback) {
    User.create(user, callback);
};

module.exports.getUserByUserName = function (userName, callback) {
    let query = {
        userName: userName
    }
    User.findOne(query, callback)
}

module.exports.getUserByID = function (id, callback) {
    User.findById(id, callback);
}
module.exports.updatePassword = function (user, callback) {

    let update = {
        password: user.password
    }
    User.findByIdAndUpdate(user._id, update, callback);
}

module.exports.removeUser = function (id, callback) {
    User.findByIdAndRemove(id, callback);
}










