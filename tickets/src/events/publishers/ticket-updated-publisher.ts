import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from '@high-demand-ticket/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
