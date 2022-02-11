const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const req = require('express/lib/request');

// Mocks
jest.mock('../lib/utils/github.js');
const mockPost = {
  title: 'mock-post-title',
  description: 'This is a mock post description for testing.',
  category: 'testing',
};

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
    const agent = request.agent(app);
    const req = await agent
      .get('/api/v1/github/login/callback?code=69')
      .redirects(1);

    expect(req.body).toEqual([]);
  });

  it('user logins in and is redirected to posts, then creates a new post', async () => {
    const agent = request.agent(app);
    // login user, retrieve auth cookie
    await agent.get('/api/v1/github/login/callback?code=69').redirects(1);

    const postReq = await agent.post('/api/v1/posts').send(mockPost);
    const actual = postReq.body;

    const expected = {
      ...mockPost,
      id: expect.any(String),
      userId: expect.any(String),
      createdAt: expect.any(String),
    };

    expect(actual).toEqual(expected);
  });
});
