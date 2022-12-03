const { ObjectId } = require('bson');
const { Schema, model } = require('mongoose')

const Reactionschema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: new ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            max: 280
        },
        username: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Thought'
            },
            
          ],
          createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
      }
    }
)
//This isn't a model, only used for the reaction field subdoc in thought model


const Reaction = model('Reaction', Reactionschema)
module.exports = Reaction;