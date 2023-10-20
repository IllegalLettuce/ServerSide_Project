const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var scheme = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    workshopDate: {
        type: Date,
        required: true
    },

}, {
    timestamps: true
});
var book = mongoose.model('Book', scheme);

module.exports = book;