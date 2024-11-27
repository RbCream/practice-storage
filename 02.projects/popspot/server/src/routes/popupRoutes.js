// src/routes/popupRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const popupController = require('../controllers/popupController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../uploads/'));  // 절대 경로로 수정
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

// 라우트 핸들러 함수 직접 참조
router.get('/popups', popupController.getPopups);
router.post('/popups', upload.single('main_image'), popupController.createPopup);
router.put('/popups/:id', popupController.updatePopup);
router.delete('/popups/:id', popupController.deletePopup);

module.exports = router;