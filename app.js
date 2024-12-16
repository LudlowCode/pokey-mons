const { MongoClient } = require("mongodb");
const cors = require("cors");
const app = require("express")();

// Replace the uri string with your connection string.
const uri = "mongodb+srv://LudlowReader:I0op4qBHMCGz1bMt@cluster0.6m5on.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);
const database = client.db('pokemon');
const pokes = database.collection('pokes');

const PORT = 3000;


app.use(cors()); //removes cors issues clent-side

// Define a simple route for HTTP GET requests
app.get('/', async (req, res) => {
    try {
      const output = await pokes.find().toArray();
      console.log(output);
      res.send(output);
  
    } catch (err) {
      res.status(500).json({ message: 'Error fetching data from MongoDB)', error: err });
    }
  });
  app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}/`);
  });