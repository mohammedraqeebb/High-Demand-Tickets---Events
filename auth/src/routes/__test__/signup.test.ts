import request from 'supertest';

import { app } from '../../app';

it('returns a 201  on successful signup', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
});

it('returns a 400 with an invalid email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'sajdfhg',
      password: 'password',
    })
    .expect(400);
});

it('returns a 400 with an invalid email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'sajdfhg',
      password: 'p',
    })
    .expect(400);
});

it('returns a 400 with missing email and password', async () => {
  await request(app).post('/api/users/signup').send({}).expect(400);
});

it('returns a 400 with an invalid email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
});

it('sets a cookie header', async () => {
  const response = await request(app).post('/api/users/signup').send({
    email: 'test1@test.com',
    password: 'password',
  });

  expect(response.get('Set-Cookie')).toBeDefined();
});
