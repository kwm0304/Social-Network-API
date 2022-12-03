// /api/users
    //GET all users 
    //GET user by their _id and populated thought and friend data
    //POST a new user
    //PUT to update a user by their id
    //DELETE to remove user by it's id 

///api/users/:userId/friends/:friendId
    // POST to add a new friend to a user's friend list
    // DELETE to remove a friend from a user's friend list

// /api/thoughts
    // GET to get all thoughts
    // GET to get a single thought by its _id
    // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
    //PUT to update a thought by its _id
    //DELETE to remove a thought by its _id

// /api/thoughts/:thoughtId/reactions
    // POST to create a reaction stored in a single thought's reactions array field
    // DELETE to pull and remove a reaction by the reaction's reactionId value