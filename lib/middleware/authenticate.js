// AUTHENTICATE
// - cookie from req.
// - jwt verify the cookie
// - set req.user to verified payload
// - calls next

const jwt = require('jsonwebtoken');

// - if err, next(err)
module.exports = async (req, res, next) => {
  try {
    const cookie = req.cookies[process.env.COOKIE_NAME];
    const payload = jwt.verify(cookie, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};
