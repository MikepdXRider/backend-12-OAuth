const pool = require('../utils/pool.js');

// post model
module.exports = class Post {
  // fields: title, description, category
  id;
  userId;
  title;
  description;
  category;
  createdAt;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.description = row.description;
    this.category = row.category;
    this.userId = row.user_id;
    this.createdAt = row.created_at;
  }

  // insert
  // queries pool and inserts new post
  // returns insert response

  // getAll
  // queries pool and getAll new post
  // returns mapped insert response
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM posts');
    return rows.map((row) => new Post(row));
  }
};
