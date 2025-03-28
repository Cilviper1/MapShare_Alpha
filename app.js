// Code for the server
// This server serves the static files in the directory and handles the login form submission
// It uses the node-localstorage package to store the user's login information
const express = require('express');
const bodyParser = require('body-parser');
const { handleLoginFormSubmission } = require('loginHandler');
const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./scratch'); // Specify a directory for storage

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve static files like index.html and user.html

// Login endpoint
app.post('/login', (req, res) => {
    handleLoginFormSubmission(req, res);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});