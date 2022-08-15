const { Schema, model } = require("mongoose")
const User = require("./User")

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

    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
)

const Thought = model("Thought", thoughtSchema)
module.exports = Thought
