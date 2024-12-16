const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const uri = "mongodb+srv://LudlowReader:I0op4qBHMCGz1bMt@cluster0.6m5on.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('pokemon');
    const pokes = database.collection('pokes');
    // Query for a pokemon number 1
    const query = { id: '001' };
    const poke = await pokes.findOne(query);
    console.log(poke);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);