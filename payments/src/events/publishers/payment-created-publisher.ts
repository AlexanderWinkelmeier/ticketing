import {
  Publisher,
  Subjects,
  PaymentCreatedEvent,
} from '@rawrawtickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
