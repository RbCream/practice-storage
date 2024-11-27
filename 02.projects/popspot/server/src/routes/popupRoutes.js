// src/routes/popupRoutes.js
const express = require('express');
const router = express.Router();
const popupController = require('../controllers/popupController');
const handleUpload = require('../middlewares/uploadMiddleware');

// 라우트 정의
router.get('/popups', popupController.getPopups);
router.post('/popups', handleUpload, popupController.createPopup);
router.put('/popups/:id', handleUpload, popupController.updatePopup);
router.delete('/popups/:id', popupController.deletePopup);

module.exports = router;