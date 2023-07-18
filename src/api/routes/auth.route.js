const { register, login } = require('../controllers/auth.controller');

const router = require('express').Router();

router.post('/auth/register', register);
router.post('/auth/login', login);

module.exports = router;