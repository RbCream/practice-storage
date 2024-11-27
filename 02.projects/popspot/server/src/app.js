// src/app.js
const express = require('express');
const configExpress = require('../config/express');
const popupRoutes = require('./routes/popupRoutes');
const path = require('path');

const app = express();

// Express 설정 적용
configExpress(app);

// 라우트 설정
app.use('/api', popupRoutes);
// uploads 폴더를 정적 파일로 제공
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// 클라이언트 빌드 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;