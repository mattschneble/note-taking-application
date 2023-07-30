// import all packages
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// specify port
const PORT = 3001;

// set up express app to handle data parsing regardless of incoming data style/method
app.use(express.urlencoded({ extended: true }));
// change received data to JSON format for use
app.use(express.json());
// set up express app to handle static files and set root directory as the public folder
app.use(express.static('public'));

// set route to db.json file
app.get('/api/notes', (req, res) => {
    // read the db.json file
    fs.readFile('./db/db.json', (err, data) => {
        // throw error if there is one
        if (err) throw err;
        // parse the data
        const notes = JSON.parse(data);
        // send the parsed data back to the client
        res.json(notes);
    });
});


// route for index.html
    // use GET * 
// route for notes.html 
    // use GET /notes
// route for POST = when the user inputs information for new note
    // use POST /api/notes
// OPTIONAL: route for delete (remove using the id property), rewrite to the 'db.json' file
    // use DELETE /api/nodes/:id

// listen on port
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT} is now active and listening!`);
});