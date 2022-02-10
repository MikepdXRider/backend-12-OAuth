// userservice class
const jwt = require('jsonwebtoken');
const githubUser = require('../controllers/githubUser.js');
const GithubUser = require('../models/GithubUser.js');

module.exports = class UserService {
  // signup function
  // takes in user obj
  // check to see if user already exists.
  // if user exists...
  // compare passwords
  // if password matches, return user
  // if password doesn't match, throw error
  // if user doesn't exist...
  // hash password
  // call User model insert fn with user obj
  // return new user obj
  async static createSignedUser({ login, avatar_url, email }) {
    let user = await GithubUser.findUserByEmail(email);

    if (!user) {
      user = await githubUser.insert({
        username: login,
        email,
        avatar: avatar_url,
      });
    }

    return jwt.sign({ ...user }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });
  }
};
