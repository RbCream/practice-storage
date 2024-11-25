const PopupModel = require('../models/popupModel');
const { successResponse, errorResponse } = require('../utils/responseHandler');


const PopupController = {
    getPopups: async (req, res) => {
        try {
            const { page = 1, filter = 'latest', search = '' } = req.query;
            const popups = await PopupModel.getAll(page, filter, search);
            return successResponse(res, popups);
        } catch (error) {
            return errorResponse(res, error);
        }
    },

    getPopupById: async (req, res) => {
        try {
            const { id } = req.params;
            const popup = await PopupModel.getById(id);
            if (!popup) {
                return errorResponse(res, '팝업스토어를 찾을 수 없습니다.', 404);
            }
            return successResponse(res, popup);
        } catch (error) {
            return errorResponse(res, error);
        }
    },

    createPopup: async (req, res) => {
        try {
            const popup = await PopupModel.create(req.body);
            return successResponse(res, popup, 201);
        } catch (error) {
            return errorResponse(res, error);
        }
    },

    updateStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const { isActive } = req.body;
            const popup = await PopupModel.updateStatus(id, isActive);
            if (!popup) {
                return errorResponse(res, '팝업스토어를 찾을 수 없습니다.', 404);
            }
            return successResponse(res, popup);
        } catch (error) {
            return errorResponse(res, error);
        }
    },

    deletePopup: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await PopupModel.delete(id);
            if (!result) {
                return errorResponse(res, '팝업스토어를 찾을 수 없습니다.', 404);
            }
            return successResponse(res, { message: '팝업스토어가 삭제되었습니다.' });
        } catch (error) {
            return errorResponse(res, error);
        }
    }
};
module.exports = PopupController;