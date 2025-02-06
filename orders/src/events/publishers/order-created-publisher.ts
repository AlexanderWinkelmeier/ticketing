import { Subjects, Publisher, OrderCreatedEvent } from '@rawrawtickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
