const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const { content, postId } = req.body;
    if (!content || !postId) {
      res.status(400).json({ message: 'Content and Post ID are required' });
      return;
    }

    const newComment = await Comment.create({
      content,
      post_id: postId,
      user_id: req.session.user_id,
    });

    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;