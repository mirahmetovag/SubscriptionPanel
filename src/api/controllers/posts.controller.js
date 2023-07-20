const {fetch, fetchOne} = require('../../libs/pg');

const getPosts = async (req,res) => {
    const {channel_id} = req.params;
    const data = await fetch('SELECT title FROM posts WHERE channel_id = $1', channel_id);
    res.status(200).json({message: 'List of posts was formed', data});
};

const createPost = async (req,res) => {
    const {title, body} = req.body;
    const {channel_id} = req.params;
    const user_id = req.user.user_id;
    await fetchOne('INSERT INTO posts (title, body, user_id,channel_id) values ($1,$2,$3,$4)', title, body, user_id, channel_id);
    res.status(201).json({message: 'Post was successfully created'});
};

const updatePost = async (req,res) => {
    const {title, body} = req.body;
    const {channel_id, post_id} = req.params;
    const thePost = await fetchOne('SELECT * FROM posts WHERE post_id = $1', post_id);
    console.log(thePost);
    if (thePost.channel_id !== channel_id) return res.status(400).json({message: 'You are not allowed to update the post'});
    await fetchOne('UPDATE posts SET title = $1, body =$2 WHERE post_id = $3', title, body, post_id);
    res.status(200).json({message: 'Post was successfully updated'});
};

const deletePost = async (req,res) => {
    const {channel_id, post_id} = req.params;
    const thePost = await fetchOne('SELECT * FROM posts WHERE post_id = $1', post_id);
    if (thePost.channel_id != channel_id) return res.status(400).json({message: 'You are not allowed to delete the post'});
    await fetchOne('DELETE FROM posts WHERE post_id = $1', post_id);
    res.status(200).json({message:'Post was successfully deleted'});
};


module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost
}