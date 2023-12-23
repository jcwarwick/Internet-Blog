const router = require('express').Router();
const { Post, User } = require('../../models'); // Import User model
const withAuth = require('../../utils/auth');


router.get('/:id', async (req, res) => {
    try {
        console.log("Received request to fetch post with ID:", req.params.id);
        const post = await Post.findByPk(req.params.id, {
            include: [{ model: User, attributes: ['username'] }]
        });

        if (!post) {
            console.log("No post found with ID:", req.params.id);
            return res.status(404).json({ message: 'Post not found' });
        }

        console.log("Fetched post:", post);
        res.json(post);
    } catch (err) {
        console.error("Error fetching post:", err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// Route to create a new post
router.post('/', withAuth, async (req, res) => {
    try {
        // Create a new post using the form data (req.body)
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id, 
        });
        // Redirect to the dashboard after successful post creation
        res.redirect('/dashboard');
    } catch (err) {
        // Handle errors, possibly by rendering an error page or redirecting to an error handler route
        res.status(500).send(err.message);
    }
});

// PUT route for updating a post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const [updatedRows] = await Post.update(
            {
                title: req.body.title,
                content: req.body.content
            },
            {
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id // Ensure that only the owner can update the post
                }
            }
        );

        if (updatedRows > 0) {
            res.json({ message: 'Post updated successfully' });
        } else {
            res.status(404).json({ message: 'No post found with this id!' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});
// DELETE route for deleting a post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedPost = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });

        if (deletedPost) {
            res.status(204).end(); // No content to send back
        } else {
            res.status(404).json({ message: 'No post found with this id!' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;