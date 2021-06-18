const Assign = require('../models/Assign');
const Ticket = require('../models/Ticket');

const {assignValidation} = require('../validations/assignValidation.js');

module.exports.assign = async ( req, res ) => {
    //Get ticket data
    const {idTech, moreInfo, idUser, idTicket} = req.body;
    let state = '';
    //Validate data
    const {error} = assignValidation(req.body);
    if (error) return res.status(400).json({message: error.details[0].message});
    
    //Look for a state
    const assign = await Assign.findOne({idTicket: idTicket});

    if ( !assign ) {
        state = 'Assigned';
    }else if ( assign.state === 'Re-waiting'){
        state = 'Re-Assigned';
    }else{
        return res.status(400).json({message: 'The state of this ticket cannot be updated'});
    }

    //Save the assign
    try {
        const createdAssign = await Assign.create({idTech, moreInfo, idUser, idTicket, state });
        if (createdAssign){
            //Update the main ticket with the currente state
            //Look for a user in the database
            const ticketToUpdate = await Ticket.findOne({_id: idTicket});
            
            //if user doesn't exit
            if (!ticketToUpdate){
                return res.status(404).json({ message: 'The ticket to update does not exist' });
            }

            //Define fields to update
            ticketToUpdate.state = state;

            //Update the user
            const updatedUser = await ticketToUpdate.save();
            if (!updatedUser) {
                return res.status(404).json({ message: 'Cannot update ticket' });
            }
            //Response to the client with a created assign
            res.status(200).json(createdAssign);
        } 
    } catch (error) {
        res.status(400).json({message: error});
    }  
};

module.exports.getAllAssign = () => {

};