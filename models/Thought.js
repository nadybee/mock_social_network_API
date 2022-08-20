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
      get: (timestamp) => timestamp.toLocaleString(),
    },
    updatedAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => timestamp.toLocaleString(),
    },
    // createdAt: {
    //   type: Date,
    //   default : Date.now,
    // // format: moment.format('MMMM Do YYYY, h:mm:ss a'),

    // },

    username: {
      type: String,
      required: [true, "please add username"],
    },

    reactions: [Reaction],
  },

  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    timestamps: true,
    id: false,
  }
)
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length
})

const Thought = model("Thought", thoughtSchema)
module.exports = Thought
