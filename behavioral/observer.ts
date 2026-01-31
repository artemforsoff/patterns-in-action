// Наблюдатель — это поведенческий паттерн проектирования, который создаёт механизм подписки,
// позволяющий одним объектам следить и реагировать на события, происходящие в других объектах.

// 2️⃣ Участники паттерна

// 🧠 Subject
// Хранит состояние и список подписчиков

// 👀 Observer
// Реагирует на изменения

// 🔔 Notify
// Механизм оповещения (push или pull)

interface Observer<T> {
  update(data: T): void;
}

interface Subject<T> {
  subscribe(observer: Observer<T>): void;
  unsubscribe(observer: Observer<T>): void;
}

interface Order {
  status: 'created' | 'paid' | 'shipped';
}

// Subject
class OrderStore implements Subject<Order> {
  private order: Order = {
    status: 'created',
  };
  private observers: Observer<Order>[] = [];

  subscribe(observer: Observer<Order>) {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer<Order>) {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  setStatus(value: Order['status']) {
    this.order.status = value;
    this.notify();
  }

  private notify() {
    this.observers.forEach((o) => o.update({ ...this.order }));
  }
}

// Observer
class EmailNotifier implements Observer<Order> {
  update(value: Order) {
    console.log('send email:', value);
  }
}

// Observer
class Logger implements Observer<Order> {
  update(value: Order) {
    console.log('save log:', value);
  }
}

const orderStore = new OrderStore();

const emailNotifier = new EmailNotifier();
const logger = new Logger();

orderStore.subscribe(emailNotifier);
orderStore.subscribe(logger);

orderStore.setStatus('paid');
