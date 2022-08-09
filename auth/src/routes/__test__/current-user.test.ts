import request from 'supertest';
import { app } from '../../app';

it('responds with details about the current user', async () => {
  const cookie = await global.signup();

  const response = await request(app)
    .get('/api/users/currrentuser')
    .set('Cookie', cookie)
    .send({})
    .expect(200);

  expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('responds with null if not authenticate', async () => {
  const response = await request(app)
    .get('/api/users/currrentuser')
    .send({})
    .expect(200);

  expect(response.body.currentUser.email).toEqual(null);
});
