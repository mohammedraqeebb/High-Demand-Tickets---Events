import request from 'supertest';
import { app } from '../../app';

it('respond with 400 for unregistered email', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({ email: 'test1@test.com', password: 'password' })
    .expect(400);
});

it('respond with 400 for  wrong password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'passwordd' })
    .expect(400);
});

it('respond with cookie for valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'passwordd' })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
