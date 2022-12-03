const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    deleteThought,
    updateThought
} = require('../../controllers/thought-controller');

// /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought)

// /api.thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)
//Need to add reactions
module.exports = router;