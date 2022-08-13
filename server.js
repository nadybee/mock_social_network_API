const path = require('path');
const express = require('express');
const routes = require('./controllers');
const mongodb = require('mongodb').MongoClient;


const app = express()

const PORT = process.env.PORT || 3001
const connectionStringURI = `mongodb://127.0.0.1:27017/social_mock`;

let db;

mongodb.connect(
    connectionStringURI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      db = client.db();
      app.listen(PORT, () => {
        console.log(`Example app listening at http://localhost:${PORT}`);
      });
    }
  );
  

  

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(routes);

module.exports = {db}

