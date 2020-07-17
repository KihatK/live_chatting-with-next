const SocketIO = require('socket.io');
const cookieParser = require('cookie-parser');
const cookie = require('cookie-signature');
const axios = require('axios');

module.exports = (server, app, sessionMiddleware) => {
    const io = SocketIO(server);

    app.set('io', io);
    const room = io.of('/room');
    const chat = io.of('/chat');

    io.use((socket, next) => {
        cookieParser(process.env.COOKIE_SECRET)(socket.request, socket.request.res, next);
    });
    io.use((socket, next) => {
        sessionMiddleware(socket.request, socket.request.res, next);
    });

    room.on('connection', (socket) => {
        socket.emit('hello', 'it\'s room namespace');
    });

    chat.on('connection', (socket) => {
        socket.emit('hello', 'it\'s chat namespace');
        socket.on('sendMsg', (data) => {
            axios.post(`http://localhost:3065/room/${data.id}/chat`, { chat: data.chat, user: data.nickname });
        });
    });
    
    io.on('connection', (socket) => {
        socket.emit('hello', 'welcome to socket.io');
    });
}