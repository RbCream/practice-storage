const pool = require('../../config/database');

const popupService = {
    getPopups: async (page = 1, filter = 'latest', search = '') => {
        const limit = 8;
        const offset = (page - 1) * limit;
        const params = [];

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
        params.push(limit, offset);

        const [rows] = await pool.query(query, params);
        return rows;
    },

    createPopup: async (popupData, mainImagePath, detailImages) => {
        const [result] = await pool.query(
            `INSERT INTO popups (
                title, content_type, organizer, location,
                start_date, end_date, operation_hours, description,
                main_image, views, created_at, is_deleted
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), false)`,
            [
                popupData.title,
                popupData.content_type,
                popupData.organizer,
                popupData.location,
                popupData.start_date,
                popupData.end_date,
                popupData.operation_hours,
                popupData.description,
                mainImagePath,
                0
            ]
        );

        if (detailImages?.length > 0) {
            const detailImageValues = detailImages.map(file => [result.insertId, file.path]);
            await pool.query(
                `INSERT INTO popup_detail_images (popup_id, image_url) VALUES ?`,
                [detailImageValues]
            );
        }

        return result.insertId;
    },

    updatePopup: async (id, popupData, mainImagePath) => {
        const [result] = await pool.query(
            `UPDATE popups SET
                               title = ?, content_type = ?, organizer = ?, location = ?,
                               start_date = ?, end_date = ?, operation_hours = ?, description = ?,
                               main_image = COALESCE(?, main_image)
             WHERE id = ? AND is_deleted = false`,
            [
                popupData.title,
                popupData.content_type,
                popupData.organizer,
                popupData.location,
                popupData.start_date,
                popupData.end_date,
                popupData.operation_hours,
                popupData.description,
                mainImagePath,
                id
            ]
        );
        return result.affectedRows > 0;
    },

    deletePopup: async (id) => {
        const [result] = await pool.query(
            `UPDATE popups SET is_deleted = true WHERE id = ?`,
            [id]
        );
        return result.affectedRows > 0;
    }
};

module.exports = popupService;