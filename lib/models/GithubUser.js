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
  static async insert({ username, email, avatar }) {
    const { rows } = await pool.query(
      'INSERT INTO users(username, email, avatar) VALUES($1, $2, $3) RETURNING *',
      [username, email, avatar]
    );
    return new GithubUser(rows[0]);
  }

  // findUserByEmail
  // takes in email
  // query pool to select user where email = email
  // return new instance of class
  static async findUserByEmail(email) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email=$1', [
      email,
    ]);
    if (!rows.length) return null;
    return new GithubUser(rows[0]);
  }
};
