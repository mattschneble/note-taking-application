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

// set route to index.html
// route for GET = when the user clicks on the 'Get Started' button
app.get('/api/notes', (req, res) => {
    // read the db.json file
    fs.readFile('./db/db.json', (err, data) => {
        // throw error if there is one
        if (err) throw err
        else {
        // parse the data
        const notes = JSON.parse(data);
        // send the parsed data back to the client
        res.json(notes);
        }
    })
});
 
// route for notes.html 
// route for GET = when the user clicks on the 'Get Started' button
app.get('/notes', (req, res) => {
    // send the notes.html file to the client
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// route for POST = when the user inputs information for new note and clicks on the save button
app.post('/api/notes', (req, res) => {
    // retrieve the new note from the request body
    const originalNote = req.body;
    // read the db.json file
    fs.readFile('./db/db.json', (err, data) => {
        // throw error if there is one
        if (err) throw err
        else {
        // parse the data
        const notesData = JSON.parse(data);
        // add the new note to the array
        notesData.push(req.body);
        // stringify the data
        const stringifiedData = JSON.stringify(notesData);
        // write the data to the db.json file
        fs.writeFile('./db/db.json', stringifiedData, (err) => {
            // throw error if there is one
            if (err) throw err
            else {
            // send the parsed data back to the client
            res.json(notesData);
            }
        })
        }
    })
});


// listen on port
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT} is now active and listening!`);
});