const express = require('express');
const router = express.Router();
const BookController = require('../controllers/sach.controller');
const bookController = new BookController();

router.get('/', bookController.getAll);
router.post('/', bookController.add);
router.patch('/', bookController.update);
router.delete('/:masach', bookController.delete);

module.exports = router;