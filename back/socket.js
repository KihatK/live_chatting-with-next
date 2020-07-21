const SocketIO = require('socket.io');
const axios = require('axios');

module.exports = (server, app) => {
    const io = SocketIO(server);

    app.set('io', io);
    const room = io.of('/room');
    const chat = io.of('/chat');

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