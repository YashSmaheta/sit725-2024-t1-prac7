const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { connectdb, insertData } = require('./data.js');

const app = express();
const port = 3000;
const http = require('http');
const socketIo = require('socket.io');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('New client connected');
     socket.on('formData', async (formData) => {
        try {
            await insertData(formData);
            socket.emit('formDataResponse', { message: 'Form Data Saved!!!!!' });
        } catch (err) {
            console.error('Error while saving form data:', err);
            socket.emit('formDataResponse', { error: 'Internal Server error' });
        }
    });
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// app.post('/submit', async (req, res) => {
//     try {
//         await insertData(req.body);
//         res.status(201).json({ message: 'Form Data Saved!!!!!' });
//     } catch (err) {
//         console.err('Error while saving form data:', err);
//         res.status(500).json({ err: 'Internal Server error' });
//     }
// });

connectdb().then(() => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}!`);
    });
});

module.exports = app;