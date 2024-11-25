const db = require('../../config/database');

const PopupModel = {
    getAll: async (page = 1, filter = 'latest', search = '') => {
        const limit = 6;
        const offset = (page - 1) * limit;

        let query = `
            SELECT * FROM popups 
            WHERE is_deleted = false
        `;

        if (search) {
            query += ` AND (title LIKE ? OR location LIKE ?)`;
        }

        switch (filter) {
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

        const [rows] = await db.query(query, [
            `%${search}%`,
            `%${search}%`,
            limit,
            offset
        ]);
        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.query(
            'SELECT * FROM popups WHERE id = ? AND is_deleted = false',
            [id]
        );
        return rows[0];
    },

    create: async (data) => {
        const [result] = await db.query(
            'INSERT INTO popups SET ?',
            [data]
        );
        return result.insertId;
    },

    updateStatus: async (id, isActive) => {
        const [result] = await db.query(
            'UPDATE popups SET is_active = ? WHERE id = ?',
            [isActive, id]
        );
        return result.affectedRows > 0;
    },

    delete: async (id) => {
        const [result] = await db.query(
            'UPDATE popups SET is_deleted = true WHERE id = ?',
            [id]
        );
        return result.affectedRows > 0;
    }
};

module.exports = PopupModel;