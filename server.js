// import all packages
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// refer port
const PORT = 3001;


// boiler plate info
    // uses URL encoded
// set route to db.json file
    // use GET /api/notes
// route for index.html
    // use GET * 
// route for notes.html 
    // use GET /notes
// route for POST = when the user inputs information for new note
    // use POST /api/notes
// OPTIONAL: route for delete (remove using the id property), rewrite to the 'db.json' file
    // use DELETE /api/nodes/:id

// listen on port