const router = require("express").Router()


const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought
  } = require('../../controllers/thoughtController');
  
  // /api/users
  router.route('/').get(getThoughts).post(createThought);
  
  // /api/users/:userId
  router.route('/:thoughtId')
  .get(getSingleThought)
  .delete(deleteThought)
  .put(updateThought)
  
  
  module.exports = router;