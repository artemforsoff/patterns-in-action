// Снимок — это поведенческий паттерн проектирования,
// который позволяет сохранять и восстанавливать прошлые состояния объектов
// не раскрывая подробностей их реализации.

type FormState = {
  name: string;
  email: string;
  role: string;
};

// Memento
class FormMemento {
  constructor(public readonly state: FormState) {}
}

// Originator
class FormManager {
  private state: FormState = {
    name: '',
    email: '',
    role: '',
  };

  setState(partial: Partial<FormState>) {
    this.state = { ...this.state, ...partial };
  }

  getState(): FormState {
    return { ...this.state };
  }

  save(): FormMemento {
    return new FormMemento({ ...this.state });
  }

  restore(memento: FormMemento) {
    this.state = memento.state;
  }
}

// Caretaker
class FormHistory {
  private undoStack: FormMemento[] = [];
  private redoStack: FormMemento[] = [];

  push(m: FormMemento) {
    this.undoStack.push(m);
    this.redoStack = [];
  }

  undo(): FormMemento | undefined {
    const m = this.undoStack.pop();
    if (m) this.redoStack.push(m);
    return m;
  }

  redo(): FormMemento | undefined {
    return this.redoStack.pop();
  }
}

const form = new FormManager();
const formHistory = new FormHistory();

formHistory.push(form.save());

form.setState({ name: 'Artem' });
form.setState({ role: 'GOD' });

const prev = formHistory.undo();

if (prev) {
  form.restore(prev);
}
