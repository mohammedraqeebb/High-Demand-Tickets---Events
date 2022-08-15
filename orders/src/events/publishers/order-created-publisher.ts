import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from '@high-demand-ticket/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
