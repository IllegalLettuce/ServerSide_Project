const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// The schema for the database
var scheme = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    workshopTimeSlot: {
        type: String,
        required: true
    },
    workshopDate: {
        type: Date,
        required: true
    },
    workshopLevel: {
        type: String,
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