// Iterator — паттерн, предоставляющий способ последовательного доступа
// к элементам агрегированного объекта без раскрытия его внутреннего представления.

type ActionItem = {
  id: number;
  title: string;
  priority: number;
};

type CollectionIterator<T> = {
  hasNext(): boolean;
  next(): T | null;
};

class MyCollectionIterator<T> implements CollectionIterator<T> {
  index: number = 0;

  constructor(private data: T[]) {}

  hasNext(): boolean {
    return this.index < this.data.length;
  }

  next(): T | null {
    if (!this.hasNext()) return null;

    const value = this.data[this.index];
    this.index++;
    return value;
  }
}

class ActionItemCollection {
  items: ActionItem[] = [];

  add(item: ActionItem) {
    this.items.push(item);
  }

  createIterator(): MyCollectionIterator<ActionItem> {
    return new MyCollectionIterator(this.items);
  }
}

const collection = new ActionItemCollection();

collection.add({ id: 1, title: 'Fix bug', priority: 2 });
collection.add({ id: 2, title: 'Refactor', priority: 1 });

const iterator = collection.createIterator();

while (iterator.hasNext()) {
  const item = iterator.next();
  console.log(item?.title);
}
