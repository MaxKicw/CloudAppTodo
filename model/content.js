const mongoose = require('mongoose');

const content = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    content: String,
    author: String,
});

module.exports = mongoose.model('Content',content);