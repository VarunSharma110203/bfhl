const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todoDB');

// Verify the connection
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB successfully');
});

mongoose.connection.on('error', (err) => {
    console.log('Failed to connect to MongoDB:', err);
});

// Set up the app
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Import the todo routes
const todoRoutes = require('./routes/todo');

// Use the imported routes in the app
app.use('/', todoRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
