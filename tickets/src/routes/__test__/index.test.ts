import request from 'supertest';
import { app } from '../../app';

it('/api/tickets', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title: 'concert', price: 20 })
    .expect(201);

  const tickets = await request(app).get('/api/tickets');

  expect(tickets.body.length).toEqual(1);
});
