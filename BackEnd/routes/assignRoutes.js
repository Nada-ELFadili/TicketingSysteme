const {Router} = require('express');
const router = Router();
const {requireAuth} = require('../middlwares/authMiddleware') ;

const {getAllAssign, 
    assign } = require('../controllers/assignController');

router.get('/all/:id', requireAuth, getAllAssign);
router.post('/new', requireAuth, assign);

module.exports = router;