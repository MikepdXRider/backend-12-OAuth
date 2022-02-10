const pool = require('../utils/pool.js');

// user model
module.exports = class GithubUser {
  // fields: email, avatar, username
  email;
  avatar;
  username;
  id;

  constructor(row) {
    this.email = row.email;
    this.avatar = row.avatar;
    this.username = row.username;
    this.id = row.id;
  }

  // insert
  // takes in userobj
  // query pool to insert new user
  // return new instance of class.

  // findUserByEmail
  // takes in email
  // query pool to select user where email = email
  // return new instance of class
  async static findUserByEmail(email){
      const { rows } = pool.query(
          
      )

  }
};
