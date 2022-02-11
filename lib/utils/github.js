const fetch = require('cross-fetch');
// exchangecodefortoken function
// recieves code
// makes cross-fetch post call to github with code, content type, and accepts
// parses post response
// returns token.

/**
 *
 * @param {string} code - pulled from req.query.code on redirect from github/.../authorize.
 * @returns an access token(string) that our application can use to make authorized calls to github to access this users github data.
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

/**
 *
 * @param {string} token - returns from exchangeCodeForToken fn.
 * @returns this users github profile(object).
 */
async function getGithubProfile(token) {
  const githubReq = await fetch('https://api.github.com/user', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${token}`,
    },
  });
  return githubReq.json();
}

module.exports = { exchangeCodeForToken, getGithubProfile };
