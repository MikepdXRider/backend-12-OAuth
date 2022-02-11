async function exchangeCodeForToken(code) {
  console.log('EXCHANGE CODE FOR TOKEN MOCK INVOKED');
  return 'FAKE TOKEN';
}

async function getGithubProfile(token) {
  console.log('GET GITHUB PROFILE MOCK INVOKED');
  return {
    email: 'mock-email@mock.com',
    avatar_url: 'placekitten.com/200/200',
    login: 'mock-login',
  };
}

module.exports = { exchangeCodeForToken, getGithubProfile };
