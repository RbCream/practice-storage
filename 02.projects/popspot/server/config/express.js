// config/express.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const configExpress = (app) => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    return app;
};

module.exports = configExpress;