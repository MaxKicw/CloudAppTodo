const mongoose = require('mongoose');

const account = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    mail: String,
    password: String,
});

module.exports = mongoose.model('Account',account);