const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { MongoClient } = require("mongodb");
const cors=require('cors');

// Replace the uri string with your connection string.
const uri = "mongodb+srv://LudlowReader:I0op4qBHMCGz1bMt@cluster0.6m5on.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);
// Initialize Express app
const app = express();
app.use(cors({origin: '*'}));
app.use(express.static(path.join(__dirname, 'public')));

const database = client.db('pokemon');
const pokes = database.collection('pokes');

app.get('/', async (req, res) => {
  try {
    res.sendFile(__dirname + '/views/index.html');
  } catch (err) {
    res.status(500).json({ message: 'Error fetching static page', error: err });
  }
});
// Define a simple route for HTTP GET requests
app.get('/pokes/', async (req, res) => {
  try {
    res.set('Access-Control-Allow-Origin', '*');
    let results = await pokes.find({})
    .limit(50)
    .toArray();
    res.send(results).status(200);

  } catch (err) {
    res.status(500).json({ message: 'Error fetching data from MongoDB', error: err });
  }
});


// Create HTTP server and listen on port 3000
http.createServer(app).listen(3000, () => {
  console.log('Server is running on http://localhost:3000');

});