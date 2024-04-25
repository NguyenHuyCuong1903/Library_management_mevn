const express = require('express');
const router = express.Router();
const NXBController = require('../controllers/nhaxuatban.controller');
const nxbController = new NXBController();

router.get('/', nxbController.getAll);
router.post('/add', nxbController.add);
router.patch('/:manxb', nxbController.update);
router.delete('/:manxb', nxbController.delete);

module.exports = router;