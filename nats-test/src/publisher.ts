import nats from 'node-nats-streaming';

import { TicketCreatedPublisher } from './events/ticket-publisher';
console.clear();
const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', async () => {
  console.log('publisher connected to NATS');

  const data = {
    id: '123',
    title: 'concert',
    price: 20,
  };
  await new TicketCreatedPublisher(stan).publish(data);
});
