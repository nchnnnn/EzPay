require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');

// Serve everything in public/
app.use(express.static("public"))


// Default route → index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log("Server running at http://localhost:7000");
});

