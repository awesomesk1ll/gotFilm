const express = require('express');
const controllers = require('../controllers');
const {check} = require('express-validator');


const router = express.Router();

router.post('/login/', [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(), 
    check('password', 'Введите пароль').exists()
    ], controllers.auth.postLogin);

    router.post('/register/', [
        check('email', 'Некорректный email').isEmail(), 
        check('password', 'Минимальная длина пароля 6 символов').isLength({min: 6}),
        check('nickname', 'Минимальная длина имени пользователя 3 символа').isLength({min: 3})
    ], controllers.auth.postRegister);

module.exports = router;