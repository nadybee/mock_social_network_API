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
  // create a new user
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        let updatedValue =  User.findOneAndUpdate(
          {username: req.body.username},
          {$push: {thoughts: thought._id}},
          {new: true}
        )
        console.log(updatedValue)
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

  //Update a user and associated apps

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

  // Delete a user and associated apps
  deleteThought(req, res) {
    User.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>{
        if (!thought) {
           res.status(404).json({ message: 'No thought with that ID' })
        }
    }
      )
      .then(() => res.json({ message: 'thought deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
};
