const express = require('express');
const controllers = require('../controllers');

const router = express.Router();

router.post('/', controllers.films.postFilms);
router.get('/:part', controllers.films.getFilms);
router.patch('/', controllers.films.updateLists);

module.exports = router;
