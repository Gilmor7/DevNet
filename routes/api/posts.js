const express = require('express');
const router = express.Router();
const passport = require('passport');
const Joi = require('@hapi/joi');

//bring in midllewares
const raw = require('../../middlewares/route.async.wrapper');

// getting the models for communication with DB
const User = require('../../models/User');
const Post = require('../../models/Post');

// bring in validation schemas and functions
const { postValSchema } = require('../../validation/post.validation');
const { commentValSchema } = require('../../validation/comment.validation');
const createJoiErrObj = require('../../validation/validation.errors.handle');


// @route  GET api/posts/test
// @desc   Tests posts route
// @acces  Public
router.get('/test', (req, res) => {
    res.json({ msg: 'posts work' });
});



// @route  Get api/posts
// @desc   get all posts
// @acces  Public
router.get('/', raw(async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
}))


// @route  Get api/posts/:id
// @desc   get a post by id 
// @acces  Public
router.get('/:id', raw(async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.json(post);
}))


// @route  Post api/posts
// @desc   Create post
// @acces  Private
router.post('/', passport.authenticate('jwt', { session: false }), raw(async (req, res) => {
    const result = Joi.validate(req.body, postValSchema, { abortEarly: false });

    //check for validation errors
    if (result.error) {
        //if any errors send status 400 with errors object
        return res.status(400).json(createJoiErrObj(result));
    }

    const newPost = {
        user: req.user.id,
        ...req.body
    };

    const post = await Post.create(newPost);
    res.json(post);

}));


// @route  Delete api/posts/:id
// @desc   Delete post by id
// @acces  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), raw(async (req, res) => {
    const post = await Post.findById(req.params.id);

    //check if the authenticated user is owner of the post
    if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ unauthorized: 'User not authorized' });
    }

    await post.remove();
    res.json({ succes: 'Post deleted successfully' });
}));


// @route  Post api/posts/like/:post_id
// @desc   add like to post
// @acces  Private
router.post('/like/:post_id', passport.authenticate('jwt', { session: false }), raw(async (req, res) => {
    const post = await Post.findById(req.params.post_id);

    // check if this user already liked this post
    const isLiked = post.likes.filter(like => like.user.toString() === req.user.id);
    if (isLiked.length > 0) {
        return res.status(400).json({ alreadyliked: 'User already liked this post' })
    }

    //add user id to the likes array
    post.likes.unshift({ user: req.user.id });

    //save to DB
    const updatedPost = await post.save();
    res.json(updatedPost);
}));


// @route  Delete api/posts/unlike/:post_id
// @desc   Unlike post
// @acces  Private
router.delete('/unlike/:post_id', passport.authenticate('jwt', { session: false }), raw(async (req, res) => {
    const post = await Post.findById(req.params.post_id);

    // check if this user liked this post
    const isLiked = post.likes.filter(like => like.user.toString() === req.user.id);
    if (isLiked.length === 0) {
        return res.status(400).json({ notliked: 'You have not liked this post' })
    }

    // find index to remove
    const removeIndex = post.likes
        .map(like => like.user.toString())
        .indexOf(req.user.id);

    // remove like from the like array
    post.likes.splice(removeIndex, 1);

    //save to DB
    const updatedPost = await post.save();
    res.json(updatedPost);
}));


// @route  Post api/posts/comment/:post_id
// @desc   add a comment to post
// @acces  Private
router.post('/comment/:post_id', passport.authenticate('jwt', { session: false }), raw(async (req, res) => {
    const result = Joi.validate(req.body, commentValSchema, { abortEarly: false });

    //check for validation errors 
    if (result.error) {
        //if any errors send status 400 with errors object
        return res.status(400).json(createJoiErrObj(result));
    }

    const post = await Post.findById(req.params.post_id);

    // create new comment 
    const newComment = {
        user: req.user.id,
        ...req.body
    }

    // push comment to the comments array
    post.comments.push(newComment);

    //save to DB
    const updatedPost = await post.save();
    res.json(updatedPost);

}));


// @route  Delete api/posts/comment/:post_id/:comment_id
// @desc   Remove a comment from post
// @acces  Private
router.delete('/comment/:post_id/:comment_id', passport.authenticate('jwt', { session: false }), raw(async (req, res) => {
    const post = await Post.findById(req.params.post_id);

    //check if comment exist
    const comment = post.comments
        .find(comment => comment._id.toString() === req.params.comment_id);

    // filter(comment => comment._id.toString() === req.params.comment_id);

    if (!comment) {
        return res.status(404).json({ commentNotExist: 'The comment does not exist' });
    }

    //check if comment is not connected to the user and if the user wants to delete other user comment 
    //and he is not the post owner
    if (comment.user.toString() !== req.user.id &&
        req.user.id !== post.user.toString()) {
        return res.status(403).json({ unauthorized: 'You are not authorized to delete this comment' });
    }

    //get remove index
    const removeIndex = post.comments.indexOf(comment);
    // remove comment from comments array
    post.comments.splice(removeIndex, 1);

    //save to DB
    const updatedPost = await post.save();
    res.json(updatedPost);

}));



module.exports = router;