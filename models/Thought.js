const { Schema, model } = require('mongoose');
const format = require('date-fns/format')

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
            get: createdAtVal => format(createdAtVal, 'MM/dd/yyyy')
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
              get: createdAtVal => format(createdAtVal, 'MM/dd/yyyy')
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