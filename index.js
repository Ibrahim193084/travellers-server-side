const express = require('express')
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId
const cors = require('cors')
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json())

//database user information
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dy9rj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// console.log(uri)

// connecting with mongodb

async function run() {
    try {
      await client.connect();
      const database = client.db("travel");
      const servicesCollection = database.collection("services");

    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);


app.get('/',(req, res)=>{
    res.send('travel website server')
})

app.listen(port, ()=>{
    console.log('travel website server on port', port)
})