//Mongo information is not obfuscated for the purpose of this demonstration
const {
   MongoClient
} = require("mongodb")

require("dotenv").config()


const url = process.env.PASSWORD
const client = new MongoClient(url)


const express = require('express')
// Create an Express application
const app = express()

// Declare a port number here
const port = process.env.PORT || 3000

app.use(express.static('./'));

app.get('/', function (req, res) {
   res.sendFile(__dirname + '/index.html');
});


//Query mongo for tag (case insensitive) selected
app.get('/api', function (req, res) {
   const tag = req.query.tag

   async function getSupplies() {

      try {
         await client.connect()
         const collection = client.db('YBR').collection('PROD4')


         const cursorArray = await collection.find({
            Tags: {
               $regex: tag,
               $options: 'i'
            }
         }).sort({
            "Name": 1
         }).toArray()



         res.send(cursorArray)
      } catch (err) {
         res.sendStatus(400)
         console.log(err)
      }
   }
   getSupplies(tag)
});


//Query mongo for ALL TAGS. This will be used to populate our selection dropdown...as we expand tags we can dynamically populate the dropdown
app.get('/apiTAG', function (req, res) {
   // const tag=req.query.tag
   async function getTags() {

      try {
         await client.connect()
         const collection = client.db('YBR').collection('PROD4')
         const cursorArray = await collection.distinct('Tags')
         res.send(cursorArray)
      } catch (err) {
         res.sendStatus(400)
         console.log(err)
      }
   }
   getTags()
});

// Make your app listen for incoming connections
app.listen(port)


