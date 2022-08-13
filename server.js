const path = require('path');
const express = require('express');
const routes = require('./routes');
const morgan = require('morgan')
const colors = require('colors')
const connectDB = require('./config/db');
const { connect } = require('http2');


connectDB() 
const app = express()

const PORT = process.env.PORT || 3001


  

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(routes);


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`.blue.bold);
          });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server & exit process
    server.close(() => process.exit(1));
  });          



