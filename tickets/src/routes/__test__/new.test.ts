import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { natsWrapper } from './../../nats-wrapper';

it('has a route handler listening to /api/tickets for post requests', async () => {
  const response = await request(app).post('/api/tickets').send({});
  expect(response.status).not.toEqual(404);
});

it('only be accessed if the user is signed in', async () => {
  const response = await request(app).post('/api/tickets').send({});
  expect(response.status).toBe(401);
});

it('returns 400 status for bad request', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({})
    .expect(400);
});

it('returns title is required', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title: '', price: 10 })
    .expect(400);
});

it('returns price must be valid', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title: 'sldfjh', price: -10 })
    .expect(400);
});

it('returns  201 ok', async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);
  await request(app)
    .post('/api/tickets')
    .send({ title: 'concert', price: 10 })
    .set('Cookie', global.signin())
    .expect(201);
  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
});

it('publishes an event', async () => {
  const title = 'concert';
  await request(app)
    .post('/api/tickets')
    .send({ title, price: 10 })
    .set('Cookie', global.signin())
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
