const { errorMonitor } = require("events");
const { User } = require("../models");

const userController = {
    //get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-_v'
            })
            .select('-_v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },

    //get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-_v'
        })
            .select('-_v')
            .then(dbUserData => {

                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },

    //createUser
    createUser(req, res) {
        User.create(req.body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err))
    },

    //updateUser by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })// new: true prevents mongoose from returning the original document
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err))
    },

    //delete User
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return
                }
                res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err))
    },

    //add friend
    createFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: { friends: req.params.friendId }},
            { runValidators: true, new: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' })
                return
            } res.json(dbUserData)
        })
        .catch(err => res.status(400).json(errorMonitor))
    }
};

module.exports = userController;