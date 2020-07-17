const express = require('express');

const db = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const newRoom = await db.Room.create({
            title: req.body.roomTitle,
            owner: req.user.nickname,
        });
        const io = req.app.get('io');
        io.of('/room').emit('newRoom', newRoom);
        res.send('방만들기 성공!');
    }
    catch (e) {
        console.error(e);
        next(e);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const rooms = await db.Room.findAll({
            order: [['createdAt', 'DESC']],
            attributes: ['title', 'owner', 'id'],
        });
        res.json(rooms);
    }
    catch (e) {
        console.error(e);
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const room = await db.Room.findOne({
            where: { id: req.params.id },
            attributes: ['owner'],
        });
        res.json(room);
    }
    catch (e) {
        console.error(e);
        next(e);
    }
});

router.post('/:id/chat', async (req, res, next) => {
    try {
        const newChat = await db.Chat.create({
            content: req.body.chat,
            user: req.body.user,
            RoomId: parseInt(req.params.id, 10),
        });
        const sendChat = await db.Chat.findOne({
            where: { id: newChat.id },
            attributes: ['id', 'content', 'user'],
        });
        req.app.get('io').of('/chat').emit('backMsg', { sendChat });
        res.send('보냄');
    }
    catch (e) {
        console.error(e);
        next(e);
    }
});

router.get('/:id/chat', async (req, res, next) => {
    try {
        const room = await db.Room.findOne({ where: { id: req.params.id } });
        const chat = await db.Chat.findAll({
            where: { RoomId: room.id },
            order: [['createdAt', 'ASC']],
            attributes: ['id', 'content', 'user'],
        });
        res.json(chat);
    }
    catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;