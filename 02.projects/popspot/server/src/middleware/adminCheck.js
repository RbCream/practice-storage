const adminCheck = (req, res, next) => {

    const { id } = req.body;

    if (id === 'administrator') {
        next();
    } else {
        res.status(401).json({
            success: false,
            message: '관리자 권한이 필요합니다.'
        });
    }
};

module.exports = adminCheck;