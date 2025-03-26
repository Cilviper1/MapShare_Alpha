const express = require('express');
const bodyParser = require('body-parser');
const { handleLoginFormSubmission } = require('./loginHandler');

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