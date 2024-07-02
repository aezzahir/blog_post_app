const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://ayoub:cNRQTMLwGvrz7gpz@alx.mtqvj3s.mongodb.net/?appName=alx";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectRemoteDB() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (e) {
    console.error("Failed to connect to MongoDB", e);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

connectRemoteDB().catch(console.dir);
module.exports = connectRemoteDB;
