const { ObjectId } = require('bson');
const { Schema } = require('mongoose')

//Formatted as model -> change to schema
const Reactionschema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: new ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
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
            //Make date format in util/
      }
    }
)
//This isn't a model, only used for the reaction field subdoc in thought model


const Reaction = (Reactionschema)
module.exports = Reaction;