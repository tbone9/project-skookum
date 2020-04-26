const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Session = require('./session');

const AthleteSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dob: {
        type: Date
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zip: {
        type: Number
    },
    sessions: [{
        type: Schema.Types.ObjectId,
        ref: 'Session'
    }],
    profileURL: {
        type: String,
        default: '../public/he-man-icon-22-128x128.png'
    }
});


module.exports = mongoose.model('Athlete', AthleteSchema);