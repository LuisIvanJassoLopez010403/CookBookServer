var express = require('express');
var router = express.Router();
const {authenticateToken} = require('../middlewares/auth.middleware');
const {
    signup,
    login,
    updateUser,
    deleteUser,
    getUserLists
} = require('../controllers/users.controller');

router.post('/signup', signup);
router.post('/login',login);
router.post('/update-user',updateUser);
router.post('/delete-user',deleteUser);
router.get('/created-lists', authenticateToken, getUserLists);

module.exports = router;