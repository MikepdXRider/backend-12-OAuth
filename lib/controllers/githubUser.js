// controller

// import router
const Router = require('express');
const UserService = require('../services/UserService.js');
const {
  exchangeCodeForToken,
  getGithubProfile,
} = require('../utils/github.js');

module.exports = Router()
  // ✔ get /login
  // ✔redirects to githubs Oauth
  .get('/login', (req, res, next) => {
    try {
      res.redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&redirect_uri=${process.env.GH_REDIRECT_URI}&scope=user`
      );
    } catch (err) {
      next(err);
    }
  })

  // get /login/callback
  // ✔ grabs code from query params
  // ✔ calls exchangecodefortoken with code
  // ✔ calls getGithubProfile with token
  // check to see if user exists with users githubprofile username
  // if user doesn't, create one
  // jwt sign the user
  // place signed user in new cookie
  // send back something to indicate success(message/user)
  .get('/login/callback', async (req, res, next) => {
    try {
      const { code } = req.query;

      const token = await exchangeCodeForToken(code);

      const userGithubProfile = await getGithubProfile(token);

      const signedUser = await UserService.createSignedUser(userGithubProfile);

      res
        .cookie(process.env.COOKIE_NAME, signedUser, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
        })
        .redirect('/api/v1/posts');
    } catch (err) {
      next(err);
    }
  });

// delete /
// clear cookie
// send back something to indicate success(message)
