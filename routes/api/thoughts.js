const router = require("express").Router()


const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
    createReaction,
    deleteReaction
  } = require('../../controllers/thoughtController');
  
  // /api/users
  router.route('/').get(getThoughts)
  .post(createThought);
  
  // /api/users/:userId
  router.route('/:thoughtId')
  .get(getSingleThought)
  .delete(deleteThought)
  .put(updateThought)

  router.route('/:thoughtId/reactions')
  .post(createReaction)

  router.route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction)
  
  
  module.exports = router;