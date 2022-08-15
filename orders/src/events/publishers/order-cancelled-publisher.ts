import {
  Publisher,
  OrderCancelledEvent,
  Subjects,
} from '@high-demand-ticket/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
