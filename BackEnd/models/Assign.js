const mongoose = require('mongoose');

const AssignSchema = new mongoose.Schema({
    idTicket:{
        type: String,
        required: true
    },
    idUser:{
        type: String,
        required: true
    },
    idTech:{
        type: String,
        required: true
    },
    moreInfo:{
        type: String,
        required: true,
        minlength: 10
    },
    date:{
        type: Date,
        required: true,
        default: Date.now()
    },
    state:{
        type: String
    }
},{timestamps: true});

const Assign = mongoose.model('assign',AssignSchema);

module.exports = Assign;