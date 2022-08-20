const { Thought, User } = require('../models');

module.exports = {
  // Get all users
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json({success: true, count: thoughts.length, data: thoughts }))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        //updates associated document
     return  User.findOneAndUpdate(
          {_id: req.body.userId},
          {$addToSet: {thoughts: thought._id}},
          { runValidators: true, new: true }
        )
      })
      .then((user) =>
        !user
        ? res
        .status(404)
        .json({message: 'Thought created, but found no user with that ID'})
        : res.json('Created the thought!')
        )
  
      .catch((err) => res.status(500).json(err));
  },

  //Update a thought and associated documents

  updateThought(req, res) {
    Thought.findOneAndUpdate ({_id:req.params.thoughtId}, req.body, {
        new:true,
        runValidators: true
    })
    .then((thought) =>{
        if (!thought) {
           res.status(404).json({ message: 'No thought with that ID' })
        }
    }
      )
      .then(() => res.json({ message: 'Thought updated!' }))
      .catch((err) => res.status(500).json(err));
  
  },

  // Delete a thought and associated apps
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>{
        if (!thought) {
           res.status(404).json({ message: 'No thought with that ID' })
        }
    }
      )
      .then(() => res.json({ message: 'thought deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

  //add a reaction
  createReaction(req, res) {
    Thought.findOneAndUpdate ({_id:req.params.thoughtId}, req.body, {
        new:true,
        runValidators: true
    })
    .then((thought) =>{
        if (!thought) {
           res.status(404).json({ message: 'No thought with that ID' })
        }
    }
      )
      .then(() => res.json({ message: 'Reaction added to thought!' }))
      .catch((err) => res.status(500).json(err));
  
  },
//delete a reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate (
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
      
     
  )
  .then((thought) =>{
      if (!thought) {
         res.status(404).json({ message: 'reaction not found' })
      }
  }
    )
    .then(() => res.json({ message: 'Reaction Deleted!' }))
    .catch((err) => res.status(500).json(err));

  },

};
