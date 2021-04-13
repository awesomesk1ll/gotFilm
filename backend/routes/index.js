const express = require('express');
const auth = require('./auth');
const films = require('./films');

const router = express.Router();

router.use('/api/auth', auth);
router.use('/api/films', films);

module.exports = router;
