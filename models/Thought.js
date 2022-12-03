const { Schema, model } = require('mongoose');
const { timeStamp } = require('./../utils/dateFormat');
// const Reaction = mongoose.model('Reaction', reactionSchema)



const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        userName: {
              type: String,
              required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
            //Make date format in util/
      }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
)

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            minLength: 1,
            maxLength: 280,
            required: true
        },
        createdAt: {
              type: Date,
              default: Date.now,
              get: createdAtVal => dateFormat(createdAtVal)
        },
        userName: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema]
 },
 {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)


ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thought = model('Thought', ThoughtSchema)
module.exports = Thought;