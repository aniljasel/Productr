const express = require('express');
const router = express.Router();
const {
    registerUserInit,
    registerUserVerify,
    loginUserInit,
    loginUserVerify,
    getUserProfile,
    updateUserProfile
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

router.post('/signup/init', registerUserInit);
router.post('/signup/verify', registerUserVerify);
router.post('/login/init', loginUserInit);
router.post('/login/verify', loginUserVerify);
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, upload.single('profileImage'), updateUserProfile);

module.exports = router;
