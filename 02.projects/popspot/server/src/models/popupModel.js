// src/models/popupModel.js
const pool = require('../../config/database');

const PopupModel = {
    findAll: async (page, limit, filter, search) => {
        const offset = (page - 1) * limit;
        let query = `SELECT * FROM popups WHERE is_deleted = false`;

        if (search) {
            query += ` AND (title LIKE ? OR content_type LIKE ? OR location LIKE ?)`;
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
        return await pool.query(query, [`%${search}%`, `%${search}%`, `%${search}%`, limit, offset]);
    },

    create: async (popupData) => {
        const [result] = await pool.query(
            `INSERT INTO popups SET ?`,
            [popupData]
        );
        return result.insertId;
    },

    addDetailImages: async (popupId, imageUrls) => {
        const values = imageUrls.map(url => [popupId, url]);
        return await pool.query(
            `INSERT INTO popup_detail_images (popup_id, image_url) VALUES ?`,
            [values]
        );
    }
};

module.exports = PopupModel;