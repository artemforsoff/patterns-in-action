// Посетитель — это поведенческий паттерн проектирования, который позволяет добавлять в программу новые операции,
// не изменяя классы объектов, над которыми эти операции могут выполняться.

// Visitor позволяет добавлять новую операцию к объектам,
// не изменяя сами объекты.

interface FileSystemItem {
  accept(visitor: Visitor): void;
}

interface Visitor {
  visitFile(file: AwesomeFile): void;
  visitFolder(file: Folder): void;
}

class AwesomeFile implements FileSystemItem {
  constructor(public size: number) {}

  accept(visitor: Visitor): void {
    visitor.visitFile(this);
  }
}

class Folder implements FileSystemItem {
  constructor(public children: FileSystemItem[] = []) {}

  accept(visitor: Visitor): void {
    visitor.visitFolder(this);
  }
}

class SizeCalculatorVisitor implements Visitor {
  totalSize = 0;

  visitFile(file: AwesomeFile): void {
    this.totalSize += file.size;
  }

  visitFolder(folder: Folder): void {
    folder.children.forEach((child) => child.accept(this));
  }
}

const tree: FileSystemItem = new Folder([
  new AwesomeFile(100),
  new Folder([new AwesomeFile(50), new AwesomeFile(25)]),
]);
