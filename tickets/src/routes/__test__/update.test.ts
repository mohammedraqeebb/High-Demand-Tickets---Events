import request from 'supertest';
import { app } from '../../app';
import { natsWrapper } from '../../nats-wrapper';

it('responds with 200', async () => {
  const title = 'concert';
  const user = global.signin();

  const response = await request(app)
    .post('/api/tickets')
    .send({ title, price: 10 })
    .set('Cookie', user)
    .expect(201);

  const newTitle = 'New concert';
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .send({ newTitle, price: 10 })
    .set('Cookie', user)
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
