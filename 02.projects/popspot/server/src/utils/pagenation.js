// src/utils/pagination.js
const getPagination = (page, size) => {
    const limit = size ? +size : 8;  // 기본 페이지 사이즈 8
    const offset = page ? (page - 1) * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: items } = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, items, totalPages, currentPage };
};

module.exports = {
    getPagination,
    getPagingData
};