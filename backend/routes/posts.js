const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { createPost, getPosts, updatePost, deletePost } = require('../controllers/postController');

router.use(protect);
router.get('/', getPosts);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;
