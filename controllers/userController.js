const { Thought, User } = require("../models")

module.exports = {
  getUsers(req, res) {
    User.find()
      .populate("thoughts")
      .then((users) =>
        res.json({ success: true, count: users.length, data: users })
      )
      .catch((err) => res.status(500).json(err))
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("thoughts")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err))
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err))
  },

  //Update a user and associated apps

  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user with that ID" })
        }
      })
      .then(() => res.json({ message: "User and associated apps updated!" }))
      .catch((err) => res.status(500).json(err))
  },

  // Delete a user and associated apps
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user with that ID" })
        }
      })
      .then(() => res.json({ message: "User and associated apps deleted!" }))
      .catch((err) => res.status(500).json(err))
  },

  //add a associated friend to user
  addFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user with that ID" })
        }
      })
      .then(() => res.json({ message: "Friend added to user!" }))
      .catch((err) => res.status(500).json(err))
  },

  //delete associated friend
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },

      {
        $pull: {
          friends: req.params.friendId,
        },
      },
      { new: true, runValidators: true }
    )
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "reaction not found" })
        }
      })
      .then(() => res.json({ message: "friend Deleted!" }))
      .catch((err) => res.status(500).json(err))
  },
}
