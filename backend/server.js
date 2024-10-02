const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '..')));

// Serve the admin page
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../admin.html'));
    res.sendFile(path.join(__dirname, '../admin.html'));
});

// Queue to store pending questions
const questionQueue = [];

// Function to update all admins with the current queue
function updateAdminsWithQueue() {
    io.to('admin').emit('question_queue', questionQueue);
}

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('A user connected. Socket ID:', socket.id);

    // Listen for 'ask_question' events from the client
    socket.on('ask_question', (question) => {
        console.log('Received question:', question, 'from socket:', socket.id);
        
        questionQueue.push({ question, socketId: socket.id });
        
        updateAdminsWithQueue();

        if (io.sockets.adapter.rooms.get('admin') && io.sockets.adapter.rooms.get('admin').size > 0) {
            console.log('Sending new question to admin');
            io.to('admin').emit('new_question', questionQueue[0]);
        } else {
            console.log('No admin connected to receive the question');
        }
    });

    // Listen for 'provide_answer' events from the admin
    socket.on('provide_answer', ({ question, answer }) => {
        console.log('Providing answer:', question, answer);
        const questionData = questionQueue.find(q => q.question === question);
        if (questionData) {
            io.to(questionData.socketId).emit('answer', { question, answer });
            
            // Remove the question from the queue
            questionQueue.shift();

            updateAdminsWithQueue();

            if (questionQueue.length > 0) {
                io.to('admin').emit('new_question', questionQueue[0]);
            }
        }
    });

    // Handle admin connection
    socket.on('admin_connect', () => {
        socket.join('admin');
        console.log('Admin connected. Socket ID:', socket.id);
        if (questionQueue.length > 0) {
            socket.emit('new_question', questionQueue[0]);
        }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected. Socket ID:', socket.id);
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Add this at the very end of the file
console.log('Server script is running');
