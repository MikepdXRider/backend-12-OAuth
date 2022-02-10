const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const req = require('express/lib/request');

describe('backend-12-OAuth routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('user makes login attempt, is redirected to github auth', async () => {
    const req = await request(app).get('/api/v1/github/login');

    expect(req.header.location).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/login\/callback&scope=user/i
    );
  });

  it('user logins in and is redirected to posts', async () => {
    const req = await request
      .agent(app)
      .get('/api/v1/github/login/callback?code=69')
      .redirects(1);

    expect(req.body).toEqual([]);
  });
});
