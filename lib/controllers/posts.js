// post controller

// import router
const Router = require('express');

module.exports = Router()
  // get /
  // calls Post model getAll
  // returns getall response
  .get('/', async (req, res, next) => {
    try {
        const getAllResp = await 
    } catch (err) {
      next(err);
    }
  });

// post /
// calls Post model insert
// returns isnert reponse
