// Command — паттерн, который инкапсулирует запрос как объект, позволяя параметризовать
// клиентов разными запросами, ставить их в очередь, логировать и поддерживать отмену операций.

class Editor {
  #text = '';

  write(value: string) {
    this.#text += value;
  }

  erase(count: number) {
    this.#text = this.#text.slice(0, -count);
  }

  getText() {
    return this.#text;
  }
}

interface Command {
  execute(): void;
  undo?(): void;
}

class WriteCommand implements Command {
  constructor(
    private editor: Editor,
    private value: string,
  ) {}

  execute() {
    this.editor.write(this.value);
  }

  undo() {
    this.editor.erase(this.value.length);
  }
}

class EraseCommand implements Command {
  private erasedText = '';

  constructor(
    private editor: Editor,
    private count: number,
  ) {}

  execute() {
    const currentText = this.editor.getText();
    this.erasedText = currentText.slice(-this.count);
    this.editor.erase(this.count);
  }

  undo() {
    this.editor.write(this.erasedText);
  }
}

class CommandManager {
  private history: Command[] = [];

  execute(command: Command) {
    command.execute();
    this.history.push(command);
  }

  undo() {
    this.history.pop()?.undo?.();
  }
}

const editor = new Editor();
const manager = new CommandManager();

manager.execute(new WriteCommand(editor, 'Hello'));
manager.execute(new WriteCommand(editor, ' World'));
manager.execute(new EraseCommand(editor, 6));

manager.undo();

console.log(editor.getText()); // "Hello World"
