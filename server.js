const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to MongoDB (replace 'your_database_name' with your database name)
mongoose.connect('mongodb://localhost:27017/registrationDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Define the User schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

// Handle POST requests to the /register endpoint
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Create a new user document
    const newUser = new User({ username, email, password });

    try {
        // Save the user to the database
        await newUser.save();
        res.json({ success: true, message: 'Registration successful' });
    } catch (err) {
        res.json({ success: false, message: 'Registration failed' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
