const fetch = require('cross-fetch');
// exchangecodefortoken function
// recieves code
// makes cross-fetch post call to github with code, content type, and accepts
// parses post response
// returns token.

/**
 *
 * @param {string} code - pulled from req.query.code on redirect from github/.../authorize.
 * @returns an access token that our application can use to make authorized calls to this users github data.
 */
async function exchangeCodeForToken(code) {
  const githubReq = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GH_CLIENT_ID,
      client_secret: process.env.GH_CLIENT_SECRET,
      code,
    }),
  });

  const { access_token } = await githubReq.json();

  return access_token;
}

// getGithubProfile function
// recieves token
// makes cross-fetch get call to github with Authorization: token <token>
// parses get response.
// returns profile
