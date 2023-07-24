const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    userId: {
        required: true,
        type: String
    },
    categoryName: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model('category', categorySchema);