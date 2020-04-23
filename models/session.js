const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    duration: {
        type: Number,
        required: true
    },
    notes: {
        type: String
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Session', SessionSchema);