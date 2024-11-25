const AdminController = {
    login: (req, res) => {
        const { id, password } = req.body;
        if (id === 'administrator' && password === '1234') {
            return res.json({
                success: true,
                message: '로그인 성공'
            });
        }
        return res.status(401).json({
            success: false,
            message: '로그인 실패'
        });
    },

    checkAuth: (req, res) => {
        res.json({
            isAuthenticated: true,
            message: '인증된 관리자입니다'
        });
    }
};

module.exports = AdminController;