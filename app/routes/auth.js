const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth/auth');
const authController = new AuthController();

router.post('/signup', authController.signupDocGia);
router.post('/signin', authController.signinDocGia);
router.post('/staffSignup', authController.signupNhanVien);
router.post('/staffSignin', authController.signinNhanVien);

module.exports = router;