const {Router} = require('express');
const router = Router();
const {requireAuth} = require('../middlwares/authMiddleware') ;

const {getAllTickets, 
    addNewTicket, 
    deleteTicket, 
    updateTicket, 
    getTicketById,
    getTicketByUserId,
    getTicketByDate,
    getTicketByType,
    getTicketByState} = require('../controllers/ticketController');

router.get('/all', requireAuth, getAllTickets);
router.post('/new', requireAuth, addNewTicket);
router.get('/:userId', requireAuth, getTicketByUserId);
router.delete('/delete/:id', requireAuth, deleteTicket);


// router.put('/update/:id', requireAuth, updateTicket);
// router.delete('/delete/:id', requireAuth, deleteTicket);
// router.get('/:id', requireAuth, getTicketById);
// router.get('/:type', requireAuth, getTicketByType);
// router.get('/:date', requireAuth, getTicketByDate);
// router.get('/:state', requireAuth, getTicketByState);

module.exports = router;