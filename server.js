const path = require('path');
const express = require('express');
const routes = require('./routes');
//adds more info to the console
const morgan = require('morgan')
//makes the console pretty!
const colors = require('colors')
const connectDB = require('./config/db');


//makes the connection
connectDB() 

const app = express()

const PORT = process.env.PORT || 3001


  

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(morgan('common'))


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`.blue.bold);
          });


       



