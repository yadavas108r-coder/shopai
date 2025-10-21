const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { generateCaption, generateImage, getInsights } = require('../controllers/aiController');

router.post('/generate-caption', protect, generateCaption);
router.post('/generate-image', protect, generateImage);
router.get('/insights', protect, getInsights);

module.exports = router;
