// src/services/popupService.js
const pool = require('../../config/database');

const popupService = {
    getPopups: async (page = 1, filter = 'latest', search = '') => {
        const limit = 8;
        const offset = (page - 1) * limit;
        const params = [];  // 쿼리 파라미터 배열 추가

        let query = `SELECT * FROM popups WHERE is_deleted = false`;

        if (search) {
            query += ` AND (title LIKE ? OR content_type LIKE ? OR location LIKE ?)`;
            params.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }

        switch(filter) {
            case 'views':
                query += ` ORDER BY views DESC`;
                break;
            case 'deadline':
                query += ` ORDER BY end_date ASC`;
                break;
            default:
                query += ` ORDER BY created_at DESC`;
        }

        query += ` LIMIT ? OFFSET ?`;
        params.push(limit, offset);  // limit와 offset 추가

        const [rows] = await pool.query(query, params);  // 파라미터 배열 사용
        return rows;
    },

    createPopup: async (popupData, mainImagePath, detailImages) => {
        const [result] = await pool.query(
            `INSERT INTO popups (
                title, content_type, organizer, location, 
                start_date, end_date, operation_hours, description, 
                main_image, views
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                popupData.title,
                popupData.contentType,
                popupData.organizer,
                popupData.location,
                popupData.startDate,
                popupData.endDate,
                popupData.operationHours,
                popupData.description,
                mainImagePath,
                0  // 초기 조회수 추가
            ]
        );

        if (detailImages && detailImages.length > 0) {
            const detailImageValues = detailImages.map(file => [result.insertId, file.path]);
            await pool.query(
                `INSERT INTO popup_detail_images (popup_id, image_url) VALUES ?`,
                [detailImageValues]
            );
        }

        return result.insertId;
    }
};

module.exports = popupService;