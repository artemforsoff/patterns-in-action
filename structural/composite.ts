// Composite — паттерн, который позволяет одинаково работать с одиночными объектами и их группами,
// объединяя их в деревовидную структуру.

interface ActionItemComponent {
  getUrgencyCount(): number;
}

type Urgency = 'low' | 'medium' | 'high';

class ActionItem implements ActionItemComponent {
  constructor(private urgency: Urgency) {}

  getUrgencyCount(): number {
    return this.urgency === 'high' ? 1 : 0;
  }
}

class ActionItemGroup implements ActionItemComponent {
  private items: ActionItemComponent[] = [];

  add(item: ActionItemComponent) {
    this.items.push(item);
  }

  getUrgencyCount(): number {
    return this.items.reduce((sum, item) => sum + item.getUrgencyCount(), 0);
  }
}

const item1 = new ActionItem('high');
const item2 = new ActionItem('low');

const subGroup = new ActionItemGroup();
subGroup.add(item1);
subGroup.add(item2);

const rootGroup = new ActionItemGroup();
rootGroup.add(subGroup);
rootGroup.add(new ActionItem('high'));

rootGroup.getUrgencyCount();
