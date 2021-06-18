const Ticket = require('../models/Ticket');

const {ticketValidation} = require('../validations/ticketValidation.js');

module.exports.getAllTickets = async (req,res) =>{
    try {
        const tickets = await Ticket.find();
        if (tickets) res.status(200).json(tickets);
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports.addNewTicket = async (req,res) =>{
    //Get ticket data
    const {title, urgence, description, type,userId} = req.body;

    //Validate data
    const {error} = ticketValidation(req.body);
    if (error) return res.status(400).json({message: error.details[0].message});
    
    //Save the ticket
    try {
        const createdTicket = await Ticket.create({title, urgence, description, type, userId});
        console.log('after user created');
        if (createdTicket) res.status(200).json(createdTicket);
    } catch (error) {
        res.status(400).json({message: error});
    }  
};

module.exports.getTicketByUserId = async (req,res) =>{
    try {
        console.log(req.params.userId)
        const tickets = await Ticket.find({userId : req.params.userId});
        if (tickets) res.status(200).json(tickets);
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports.deleteTicket = async (req,res) =>{
    await Ticket.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            return res.status(404).send({ message: 'Cannot delete the ticket' });
        }
        res.status(201).send('ticket removed');
    });
};

module.exports.updateTicket = async (req,res) =>{};

module.exports.getTicketById = async (req,res) =>{};
module.exports.getUsersByType = async (req,res) =>{};

module.exports.getTicketByDate = async (req,res) =>{};
module.exports.getTicketByState = async (req,res) =>{};
