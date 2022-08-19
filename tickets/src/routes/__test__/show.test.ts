import request from 'supertest';
import { app } from '../../app';

it('should return 404', async () => {
  await request(app).get('/api/ticket/skdjfhkl').send({}).expect(400);
});

it('should return 200', async () => {
  const user = global.signin();
  const ticketCreation = await request(app)
    .post('/api/tickets')
    .set('Cookie', user)
    .send({ title: 'justin concert', price: 200 })
    .expect(201);

  await request(app)
    .get(`/api/ticket/${ticketCreation.body.id}`)
    .set('Cookie', user)
    .send({})
    .expect(200);
});
