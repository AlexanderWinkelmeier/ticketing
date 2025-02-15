import {
  Publisher,
  ExpirationCompleteEvent,
  Subjects,
} from '@rawrawtickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
