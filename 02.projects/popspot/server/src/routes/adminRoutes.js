const router = require('express').Router();
const AdminController = require('../controllers/adminController');
const adminCheck = require('../middleware/adminCheck');

router.post('/login', AdminController.login);
router.get('/check', adminCheck, AdminController.checkAuth);

module.exports = router;