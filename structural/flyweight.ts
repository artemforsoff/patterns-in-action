// Flyweight — паттерн, который позволяет разделять общее (intrinsic) состояние между множеством объектов,
// чтобы уменьшить потребление памяти.

type Status = 'open' | 'closed' | 'waiting';

class StatusFlyweight {
  constructor(
    public readonly status: Status,
    public readonly color: string,
    public readonly icon: string,
  ) {}
}

class StatusFactory {
  private cache = new Map<Status, StatusFlyweight>();

  get(status: Status): StatusFlyweight {
    if (!this.cache.has(status)) {
      this.cache.set(status, this.create(status));
    }

    return this.cache.get(status)!;
  }

  private create(status: Status): StatusFlyweight {
    switch (status) {
      case 'open':
        return new StatusFlyweight('open', 'green', '🟢');
      case 'closed':
        return new StatusFlyweight('closed', 'gray', '⚪');
      case 'waiting':
        return new StatusFlyweight('waiting', 'red', '🔴');
    }
  }
}

class ActionItem {
  constructor(
    public readonly id: number,
    public readonly title: string,
    private readonly statusFlyweight: StatusFlyweight,
  ) {}

  render() {
    console.log(
      `${this.statusFlyweight.icon} [${this.statusFlyweight.color}] ${this.title}`,
    );
  }
}

const statusFactory = new StatusFactory();

const items = [
  new ActionItem(1, 'Fix bug', statusFactory.get('open')),
  new ActionItem(2, 'Deploy', statusFactory.get('open')),
  new ActionItem(3, 'Crash in prod', statusFactory.get('waiting')),
  new ActionItem(4, 'Cleanup', statusFactory.get('closed')),
];

items.forEach((item) => item.render());
