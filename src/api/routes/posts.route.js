const isAuth = require('../middlewares/isAuth');
const isOwner = require('../middlewares/isOwner');
const isActive = require('../middlewares/isActive');
const { createPost, getPosts, updatePost, deletePost } = require('../controllers/posts.controller');
const router = require('express').Router();

router.get('/posts/:channel_id', isAuth, isActive, getPosts);
router.post('/post/:channel_id', isAuth, isOwner, createPost);
router.put('/post/:channel_id/:post_id', isAuth, isOwner, updatePost);
router.delete('/post/:channel_id/:post_id', isAuth, isOwner, deletePost);

module.exports = router;