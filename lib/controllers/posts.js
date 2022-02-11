// post controller

// import router
const Router = require('express');
const Post = require('../models/Post.js');

module.exports = Router()
  // get /
  // calls Post model getAll
  // returns getall response
  .get('/', async (req, res, next) => {
    try {
      const getAllResp = await Post.getAll();
      res.send(getAllResp);
    } catch (err) {
      next(err);
    }
  })

  // post /
  // calls Post model insert
  // returns isnert reponse
  .post('/', async (req, res, next) => {
    try {
      const createPostResp = Post;
    } catch (error) {}
  });
