// Bridge — паттерн, который позволяет разделить абстракцию и реализацию,
// чтобы они могли изменяться независимо друг от друга.

interface DeliveryStrategy {
  deliver(message: string): void;
}

class ImmediateDelivery implements DeliveryStrategy {
  deliver(message: string) {
    console.log(`Delivered immediately: ${message}`);
  }
}

class DelayedDelivery implements DeliveryStrategy {
  deliver(message: string) {
    setTimeout(() => {
      console.log(`Delivered after delay: ${message}`);
    }, 1000);
  }
}

abstract class AwesomeNotification {
  constructor(protected delivery: DeliveryStrategy) {}

  abstract send(): void;
}

class EmailNotification extends AwesomeNotification {
  constructor(
    private message: string,
    delivery: DeliveryStrategy,
  ) {
    super(delivery);
  }

  send() {
    this.delivery.deliver(`Email: ${this.message}`);
  }
}

class SMSNotification extends AwesomeNotification {
  constructor(
    private message: string,
    delivery: DeliveryStrategy,
  ) {
    super(delivery);
  }

  send() {
    this.delivery.deliver(`SMS: ${this.message}`);
  }
}

const immediate = new ImmediateDelivery();
const delayed = new DelayedDelivery();

const email = new EmailNotification('Hello!', immediate);
const sms = new SMSNotification('Hi!', delayed);

email.send();
sms.send();
