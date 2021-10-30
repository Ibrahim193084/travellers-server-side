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
      const tourCollection = database.collection("tours");
      const bookCollection = database.collection("book")


  //Post api for tour collection
  app.post('/tours', async (req, res) => {
    const newtour = req.body;
    const tour = await tourCollection.insertOne(newtour);
    res.send(tour)
});

      //Get api for tourcollection
      app.get('/tours', async(req, res)=>{
        const cursor = tourCollection.find({});
        const tours = await cursor.toArray();
        res.send(tours)
    })
    //Get single api  for tourcollection
    app.get('/tours/:id', async (req, res)=>{
      const id = req.params.id;
      const query = {_id: ObjectId(id)}
      const tours = await tourCollection.findOne(query)
      res.send(tours);
  })
  //Post api for book collection
  app.post('/book', async (req, res) => {
    const newBook = req.body;
    const book = await bookCollection.insertOne(newBook);
    res.send(book)
});
 //Get api for bookcollection
 app.get('/book', async (req, res) =>{
  const cursor = bookCollection.find({});
  const book = await cursor.toArray();
  res.send(book);
});

 //Delete api for bookcollection by id
 app.delete('/book/:id', async(req, res)=>{
  const id = req.params.id;
  const qurey = {_id: ObjectId(id)};
  const result = await bookCollection.deleteOne(qurey)
  res.json(result);
})
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