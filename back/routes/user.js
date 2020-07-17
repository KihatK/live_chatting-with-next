const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const db = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const exUser = await db.User.findOne({ where: { userId: req.body.userId } });
        if (exUser) {
            return res.status(401).send('이미 존재하는 아이디입니다.');
        }
        const exNickname = await db.User.findOne({ where: { nickname: req.body.nickname } });
        if (exNickname) {
            return res.status(401).send('이미 존재하는 닉네임입니다.');
        }         
        const hash = await bcrypt.hash(req.body.password, 12);
        const newUser = await db.User.create({
            userId: req.body.userId,
            password: hash,
            nickname: req.body.nickname,
        });
        return res.send('회원가입 완료!');
    }
    catch (e) {
        console.error(e);
        next(e);
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(e);
            return next(e);
        }
        if (info) {
            return res.status(401).send(info.message);
        }
        return req.login(user, async (loginErr) => {
            try {
                if (loginErr) {
                    return next(loginErr);
                }
                const fullUser = await db.User.findOne({
                    where: { id: user.id },
                    attributes: ['id', 'nickname'],
                });
                return res.json(fullUser);
            }
            catch (e) {
                next(e);
            }
        });
    })(req, res, next)
});

router.post('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('로그아웃');
});

module.exports = router;