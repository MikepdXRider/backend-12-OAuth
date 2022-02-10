// AUTHENTICATE
// - cookie from req.
// - jwt verify the cookie
// - set req.user to verified payload
// - calls next
// - if err, next(err)
