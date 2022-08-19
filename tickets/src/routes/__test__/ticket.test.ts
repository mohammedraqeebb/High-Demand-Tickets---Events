import { Ticket } from '../../models/ticket';

it('optimistic concurrency control', async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    userId: '123kjh',
  });

  await ticket.save();

  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  firstInstance!.set({ price: 25 });

  secondInstance!.set({ price: 30 });

  await firstInstance!.save();

  try {
    await secondInstance?.save();
  } catch (err) {
    return;
  }
  throw new Error('this error should not be thrown');
});
