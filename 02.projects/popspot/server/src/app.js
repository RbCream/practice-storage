const express = require('express');
const cors = require('cors');
const popupRoutes = require('./routes/popupRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 정적 파일 제공
app.use(express.static('public'));

// 라우트 설정
app.use('/api/popups', popupRoutes);
app.use('/api/admin', adminRoutes);

// 에러 핸들링
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

module.exports = app;