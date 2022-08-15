import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from '@high-demand-ticket/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
