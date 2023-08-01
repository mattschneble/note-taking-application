// import all packages
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const { v4: uuid } = require('uuid');

// specify port
const port = process.env.PORT || 3001;

// set up express app to handle data parsing regardless of incoming data style/method
app.use(express.urlencoded({ extended: true }));
// change received data to JSON format for use
app.use(express.json());
// set up express app to handle static files and set root directory as the public folder
app.use(express.static('public'));

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
})
 
// route for notes.html 
// route for GET = when the user clicks on the 'Get Started' button
app.get('/notes', (req, res) => {
    // send the notes.html file to the client
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})

// route for POST = when the user inputs information for new note and clicks on the save button
app.post('/api/notes', (req, res) => {
    // create a new note object
    const note = req.body
    // make sure the new note has an independent ID
    note.id = uuid();
    // read the db.json file
    fs.readFile('./db/db.json', (err, data) => {
        // throw error if there is one
        if (err) throw err
        else {
        // parse the data
        const updatedNote = JSON.parse(data);
        // push the new note into the notes array
        updatedNote.push(note);
        // rewrite the db.json file with the updated notes array
        fs.writeFile('./db/db.json', JSON.stringify(updatedNote), (err) => {
            // throw error if there is one
            if (err) throw err
            else {
                res.json(updatedNote);
            }
        })
        }
    })
})

// create wildcard route
app.get('*', (req, res) => {
    // send the index.html file to the client
    res.sendFile(path.join(__dirname, "./public/index.html"));
})
// listen on port
app.listen(port, () => {
    console.log(`http://localhost:${port} is now active and listening!`);
});