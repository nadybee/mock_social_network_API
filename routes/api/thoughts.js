const router = require("express").Router()


router.get('/', (req, res) => {
    res.send('getting thoughts')
})

module.exports =router