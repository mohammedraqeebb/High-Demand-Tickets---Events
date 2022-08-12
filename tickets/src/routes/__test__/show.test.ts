import request from 'supertest';
import { app } from '../../app';

it('should return 404', async () => {
  await request(app).get('/api/ticket/skdjfhkl').send({}).expect(404);
});

it('should return 404', async () => {
  const ticketCreation = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title: 'justin concert', price: 200 })
    .expect(201);

  console.log(ticketCreation);

  await request(app)
    .get(`/api/ticket/${ticketCreation.body.id}`)
    .set('Cookie', global.signin())
    .send({})
    .expect(200);
});
