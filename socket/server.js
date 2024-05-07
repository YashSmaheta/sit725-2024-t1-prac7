const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.get('index.html')
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
