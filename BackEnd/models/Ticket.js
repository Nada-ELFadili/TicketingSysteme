const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        minlength: 10
    },
    type:{
        type: String,
        required: true
    },
    urgence:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
        minlength: 10
    },
    date:{
        type: Date,
        required: true,
        default: Date.now()
    },
    userId:{
        type: String,
        required: true
    },
    state:{
        type: String,
        default: 'En attente'
    }
},{timestamps: true});

const Ticket = mongoose.model('ticket',ticketSchema);

module.exports = Ticket;