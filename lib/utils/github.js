// exchangecodefortoken function
// recieves code
// makes cross-fetch post call to github with code, content type, and accepts
// parses post response
// returns token.

// getGithubProfile function
// recieves token
// makes cross-fetch get call to github with Authorization: token <token>
// parses get response.
// returns profile
