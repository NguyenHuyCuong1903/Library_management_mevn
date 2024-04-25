const express = require('express');
const router = express.Router();
const BorrowController = require('../controllers/muonsach.controller');
const borrowController = new BorrowController();

router.get('/', borrowController.getAllForUser);
router.get('/admin', borrowController.getAllForAdmin);
router.post('/', borrowController.addBorrow);
router.patch('/', borrowController.editBorrow);
router.delete('/user/:id', borrowController.deleteBorrowUser);
router.delete('/:id', borrowController.deleteBorrow);

module.exports = router;