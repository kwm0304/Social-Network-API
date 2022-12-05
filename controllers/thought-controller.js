const { Thought, User } = require("../models")

const thoughtController = {
    getAllThoughts(req, res) {
    Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(thoughts => 
                res.json(thoughts))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    
    //get one thought by _id
    getThoughtById(req, res) {
        Thought.findOne({ _id: params.thoughtId })
            .then((thoughts) => {
                if (!thoughts) {
                    res.status(404).json(err)
                } else res.status(200).json(thoughts)
            })
            .catch((err) => res.status(500).json(err)) 
        },
    
    //create new thought
    createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId},
                    { $push: { thoughts: _id } },
                    { new: true }
                )
            })
            .then((thoughts) => {
                if (!thoughts) {
                    res.status(404).json({ message: 'No user found with this id!' })
                    return
                }
                res.json(thoughts)
            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err)});        
    },

    //update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id},
            { $set: req.body },
            { runValidators: true, new: true }
        )
        .then((thoughts => {
            if (!thoughts) {
                res.status(404).json({ message: 'No thought found with this id!'})
            } else res.status(200).json(thoughts)
            .catch ((err) => res.status(500).json(err))
        }))
    },    
    //delete
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought found with this id!'})
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtId }},
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' })
                    return
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err))
    },

    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body }},
            { runValidators: true, new: true },
        )
        .then((Thought) => {
        if (!Thought) {
            res.status(404).json({ message: 'No thought found with this id!'})
        } else res.status(200).json(Thought)
        .catch((err) => res.status(500).json(err))
        })
    },

    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } }},
        )
        .then(Thought => {
            if (!Thought) {
                res.status(404).json({ message: 'No thought found with this id!' })
                return
            }
            res.json(Thought)
        })
        .catch(err => res.json(err))
    }
}    

module.exports = thoughtController;
