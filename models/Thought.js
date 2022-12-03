const { Schema, model } = require('mongoose')
var getUnixTime = require('date-fns/getUnixTime');
const { timeStamp } = require('./../utils/dateFormat');
// const Reaction = mongoose.model('Reaction', reactionSchema)

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: new ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLengthLength: 280
        },
        username: {
            
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
            virtuals: true,
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
            required: true,
        },
        createdAt: {
              type: Date,
              default: Date.now,
              get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionArray]
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