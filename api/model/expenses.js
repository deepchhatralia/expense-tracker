const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    userId: {
        required: true,
        type: String
    },
    category: {
        required: true,
        type: String
    },
    paymentMode: {
        required: true,
        type: String
    },
    expense: {
        required: true,
        type: Number
    },
    note: {
        required: true,
        type: String
    },
    date: {
        require: true,
        type: String,
        default: new Date(Date.now()).toLocaleString()
    }
});

module.exports = mongoose.model('expenses', expenseSchema);