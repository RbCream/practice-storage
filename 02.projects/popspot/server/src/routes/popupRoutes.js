const router = require('express').Router();
const PopupController = require('../controllers/popupController');

router.get('/', PopupController.getPopups);
router.get('/:id', PopupController.getPopupById);
router.post('/', PopupController.createPopup);
router.put('/:id/status', PopupController.updateStatus);
router.delete('/:id', PopupController.deletePopup);

module.exports = router;