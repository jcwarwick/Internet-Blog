const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Route to render the homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        console.log("Fetched Posts:", posts);
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn // Ensure consistent variable name
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect to the homepage
    if (req.session.loggedIn) { // Ensure consistent variable name
        res.redirect('/');
        return;
    }

    // Pass loggedIn state to 'signup' template
    res.render('signup', { loggedIn: req.session.loggedIn });
});

// Route to render the login page
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect to the homepage
    if (req.session.loggedIn) { // Ensure consistent variable name
        res.redirect('/');
        return;
    }

    // Pass loggedIn state to 'login' template
    res.render('login', { loggedIn: req.session.loggedIn });
});

// Route to render the dashboard page
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userPostData = await Post.findAll({
            where: { user_id: req.session.user_id },
            include: [{ model: User, attributes: ['username'] }],
        });

        const posts = userPostData.map((post) => post.get({ plain: true }));
        console.log("Fetched Posts:", posts);

        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn 
        });
    } catch (err) {
        console.error("Error fetching posts:", err);
        res.status(500).json(err);
    }
});

router.get('/posts/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                { model: User },
                { model: Comment, include: [User] }
            ]
        });

        if (!postData) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }

        const post = postData.get({ plain: true });
        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn // Ensure consistent variable name
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;