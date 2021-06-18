const { Router } = require('express')
const router = Router()
const { requireAuth } = require('../middlwares/authMiddleware')

const {
  getAllUsers,
  addNewUser,
  deleteUser,
  updatePassword,
  getUsersByType,
  loginUser,
} = require('../controllers/userController')

router.get('/all', requireAuth, getAllUsers)
router.post('/new', requireAuth, addNewUser)
router.put('/update/:id', requireAuth, updatePassword)
router.delete('/delete/:id', requireAuth, deleteUser)
router.get('/:type', requireAuth, getUsersByType)
router.post('/login', loginUser)

module.exports = router
