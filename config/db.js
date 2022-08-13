const mongoose = require("mongoose")
require("dotenv").config()

const URI = `mongodb://127.0.0.1:27017/social_mock`

let db

// mongodb.connect(
//     connectionStringURI,
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     (err, client) => {
//       db = client.db();
//
//     }
//   );

const connectDB = async () => {

    const conn = await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold)

}

module.exports = connectDB
