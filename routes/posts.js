const Express = require('express');
const router = Express.Router();
const Post = require('../models/Post');
const verify = require('./verifyToken');

// GET Method
router.get('/', verify, async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json({ msg: err });
    }

});

// POST Method
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        message: req.body.message
    });

    try {
        const savedPosts = await post.save()
        res.json(savedPosts);
    } catch (err) {
        res.json({ msg: err })
    }
});

//Speific post
router.get('/:postId', verify, async (req, res) => {
    try {
        const speificPost = await Post.findById(req.params.postId);
        res.json(speificPost);
    } catch (err) {
        res.json({ msg: err })
    }
});

//Update post
router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne({ _id: req.params.postId }, { $set: { title: req.body.title}});
        res.json(updatedPost);
    } catch (err) {
        res.json({ msg: err })
    }
});

module.exports = router;