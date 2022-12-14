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
    getThoughtById({ params }, res) {
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
            { _id: req.params.thoughtId},
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
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then(thoughts => {
                if (!thoughts) {
                    return res.status(404).json({ message: 'No thought found with this id!'})
                }
                User.findOneAndUpdate(
                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: params.thoughtId }},            
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' })
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err))
    },

    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body }},
            { new: true })
        .then((thoughts) => {
        if (!thoughts) {
            res.status(404).json({ message: 'No thought found with this id!'})
        } else res.status(200).json(thoughts)
        .catch((err) => res.status(500).json(err))
        })
    },

    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.body.reactionId } }},
            { runValidators: true, new: true }
        )
        .then(thoughts => {
            if (!thoughts) {
                res.status(404).json({ message: 'No thought found with this id!' })
                return
            }
            res.json(thoughts)
        })
        .catch(err => res.json(err))
    }
}    

module.exports = thoughtController;
