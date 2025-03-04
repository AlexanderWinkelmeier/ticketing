import {
  Subjects,
  Publisher,
  OrderCancelledEvent,
} from '@rawrawtickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
