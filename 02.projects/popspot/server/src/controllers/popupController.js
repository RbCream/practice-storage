// src/controllers/popupController.js
const popupService = require('../services/popupService');
const { successResponse, errorResponse } = require('../utils/responseHandler');

const popupController = {
    getPopups: async (req, res) => {
        try {
            const { page = 1, filter = 'latest', search = '' } = req.query;
            const popups = await popupService.getPopups(page, filter, search);
            return successResponse(res, popups, '팝업스토어 목록 조회 성공');
        } catch (error) {
            return errorResponse(res, error);
        }
    }
};

module.exports = popupController;