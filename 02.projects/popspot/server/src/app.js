// src/app.js
const express = require('express');
const configExpress = require('../config/express');
const popupRoutes = require('./routes/popupRoutes');

const app = express();

// Express 설정 적용
configExpress(app);

// 라우트 설정
app.use('/api', popupRoutes);

module.exports = app;