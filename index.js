// require is a way to load modules. 
const express = require('express')
const app = express() //Asigns express to app
const port = 3000

//Tells Express the location of the static files
app.use(express.static(__dirname + '/public'));

// index.html can be simplified since the static files are in the public folder.
app.get('/', (req, res) => res.sendFile('index.html'));

app.listen(port, () => console.log(`Example app listening on port ${port}`)
);