const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var scheme = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    workshopDateTime: {
        type: Date,
        required: true
    },
    creditCardNum: {
        type: String,
        required: true
    },
    creditCardCVV: {
        type: String,
        required: true
    },
    creditCardMonth: {
        type: String,
        required: true
    },
    creditCardYear: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});
var book = mongoose.model('Book', scheme);

module.exports = book;