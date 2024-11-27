const popupService = require('../services/popupService');

const popupController = {
    getPopups: async (req, res) => {
        const { page = 1, filter = 'latest', search = '' } = req.query;

        try {
            const rows = await popupService.getPopups(page, filter, search);
            res.json({
                success: true,
                message: "팝업스토어 목록 조회 성공",
                data: rows
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "팝업스토어 목록 조회 실패",
                error: error.message
            });
        }
    },

    createPopup: async (req, res) => {
        try {
            const {
                title,
                content_type: contentType,
                organizer,
                location,
                start_date: startDate,
                end_date: endDate,
                operation_hours: operationHours,
                description
            } = req.body;

            const mainImagePath = req.file ? `/uploads/${req.file.filename}` : null;
            const detailImages = req.files?.detailImages;

            const popupData = {
                title,
                contentType,
                organizer,
                location,
                startDate,
                endDate,
                operationHours,
                description
            };

            const insertId = await popupService.createPopup(popupData, mainImagePath, detailImages);

            res.status(201).json({
                success: true,
                message: "팝업스토어 등록 성공",
                data: { id: insertId }
            });
        } catch (error) {
            console.error('Create Error:', error);
            res.status(500).json({
                success: false,
                message: "팝업스토어 등록 실패",
                error: error.message
            });
        }
    },

    updatePopup: async (req, res) => {
        try {
            const { id } = req.params;
            const {
                title,
                content_type,
                organizer,
                location,
                start_date,
                end_date,
                operation_hours,
                description
            } = req.body;

            const mainImagePath = req.file ? `/uploads/${req.file.filename}` : null;

            const isUpdated = await popupService.updatePopup(id, {
                title,
                content_type,
                organizer,
                location,
                start_date,
                end_date,
                operation_hours,
                description
            }, mainImagePath);

            if (!isUpdated) {
                return res.status(404).json({
                    success: false,
                    message: "해당 팝업스토어를 찾을 수 없습니다."
                });
            }

            res.json({
                success: true,
                message: "팝업스토어 수정 성공",
                data: { id }
            });
        } catch (error) {
            console.error('Update Error:', error);
            res.status(500).json({
                success: false,
                message: "팝업스토어 수정 실패",
                error: error.message
            });
        }
    },

    deletePopup: async (req, res) => {
        try {
            const { id } = req.params;
            const isDeleted = await popupService.deletePopup(id);

            if (!isDeleted) {
                return res.status(404).json({
                    success: false,
                    message: "해당 팝업스토어를 찾을 수 없습니다."
                });
            }

            res.json({
                success: true,
                message: "팝업스토어 삭제 성공"
            });
        } catch (error) {
            console.error('Delete Error:', error);
            res.status(500).json({
                success: false,
                message: "팝업스토어 삭제 실패",
                error: error.message
            });
        }
    }
};

module.exports = popupController;