const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Here you would typically handle the registration logic, such as saving the user to a database
    console.log(`Received registration: ${username}, ${email}`);

    // For demonstration purposes, we're just sending a success response
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
