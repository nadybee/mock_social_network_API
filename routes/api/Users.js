const router = require("express").Router()



router.get('/', (req, res) => {
    res.send('getting users')
})

// router.get('/', (req, res) => {
//     db.collection('users')
//       .find({ featured: true })
//       .toArray((err, results) => {
//         if (err) throw err;
//         res.send(results);
//       });
//   });
  

// app.post('/create', (req, res) => {
//     // The title and author will be provided by the request body
//     db.collection('bookCollection').insertOne(
//       { title: req.body.title, author: req.body.author },
//       (err, results) => {
//         if (err) throw err;
//         res.json(results);
//       }
//     );
//   });



module.exports =router