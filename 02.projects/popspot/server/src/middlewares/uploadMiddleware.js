// src/middlewares/uploadMiddleware.js
const multer = require('multer');
const upload = require('../../config/multer');

const handleUpload = (req, res, next) => {
    upload.fields([
        { name: 'main_image', maxCount: 1 },
        { name: 'detail_images', maxCount: 5 }
    ])(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({
                success: false,
                message: '파일 업로드 실패',
                error: err.message
            });
        } else if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
        next();
    });
};

module.exports = handleUpload;