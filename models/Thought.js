const { Schema, model } = require("mongoose")
const Reaction = require("./Reaction")

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      trim: true,
      required: [true, "please add a thought"],
      maxLength: [280, "Max length is 280 characters"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },

    username: {
      type: String,
      required: [true, "please add username"],
    },

    reactions: [Reaction]

 
  },

  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
)
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length
})

const Thought = model("Thought", thoughtSchema)
module.exports = Thought;
