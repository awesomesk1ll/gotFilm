const express = require('express');
const auth = require('./auth');

const router = express.Router();

router.use('/api/auth', auth)

module.exports = router;