const { Schema, model } = require('mongoose')
var getUnixTime = require('date-fns/getUnixTime');
const { timeStamp } = require('console');
const Reaction = mongoose.model('Reaction', reactionSchema)

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const Thoughtschema = new Schema(
    {
        thoughtText: {
            type: String,
            min: 1,
            max: 280,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validateEmail, 'Plesae provide a valid email address']
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
        timestamp: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)


const doc = await Thought.findOne().populate(reactionArray)

const Thought = model('Thought', Thoughtschema)
module.exports = Thought;