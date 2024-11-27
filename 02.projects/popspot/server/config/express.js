// // config/express.js
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
//
// const configExpress = (app) => {
//     app.use(cors());
//     app.use(bodyParser.json());
//     app.use(bodyParser.urlencoded({ extended: true }));
//
//     return app;
// };
//
// module.exports = configExpress;
// config/express.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const configExpress = (app) => {

    app.use(morgan('dev')); // 개발 환경용 로깅
    // CORS 설정
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }));

    // JSON 및 URL 인코딩 설정
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // 정적 파일 제공 설정 (이미지 파일 등을 위해)
    app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

    // 요청 크기 제한 설정 (이미지 업로드를 위해)
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: false }));

    return app;
};

module.exports = configExpress;