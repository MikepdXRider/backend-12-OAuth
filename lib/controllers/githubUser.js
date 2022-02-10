// controller

// import router
const Router = require('express');

module.exports = Router()
  // get /login
  // redirects to githubs Oauth
  .get('/login', async (req, res, next) => {
    try {
      res.redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&redirect_uri=${process.env.GH_REDIRECT_URI}&scope=user`
      );
    } catch (err) {
      next(err);
    }
  });

// get /login/callback
// grabs code from query params
// calls exchangecodefortoken with code
// calls getGithubProfile with token
// check to see if user exists with users githubprofile username
// if user doesn't, create one
// jwt sign the user
// place signed user in new cookie
// send back something to indicate success(message/user)

// delete /
// clear cookie
// send back something to indicate success(message)
