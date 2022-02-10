// controller

// import router

// get /login
// redirects to githubs Oauth

// get /login/callback
// grabs code from query params
// calls exchangecodefortoken with code
// calls getGithubProfile with token
// check to see if user exists with users githubprofile username
// if user doesn't, create one
// jwt sign the user
// place signed user in new cookie
// send back something to indicate success(message/user)

// delete /
// clear cookie
// send back something to indicate success(message)
