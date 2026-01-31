// Шаблонный метод — это поведенческий паттерн проектирования, который определяет скелет алгоритма,
// перекладывая ответственность за некоторые его шаги на подклассы.
// Паттерн позволяет подклассам переопределять шаги алгоритма, не меняя его общей структуры.

// Template Method — это когда:

// базовый класс задаёт скелет алгоритма,
// а дочерние классы переопределяют отдельные шаги,
// не меняя порядок выполнения.

// Ключевая идея:

// алгоритм фиксирован, детали — вариативны

abstract class AuthFlow {
  async run(): Promise<void> {
    try {
      this.validate();
      await this.authenticate();
      this.success();
    } catch {
      this.fail();
    }
  }

  protected validate() {
    console.log('validate input');
  }

  protected abstract authenticate(): Promise<void>;

  protected success() {
    console.log('auth success');
  }

  protected fail() {
    console.log('auth failed');
  }
}

class PasswordAuth extends AuthFlow {
  protected async authenticate(): Promise<void> {
    console.log('auth with password');
  }
}

class GoogleAuth extends AuthFlow {
  protected async authenticate(): Promise<void> {
    console.log('auth with Google');
  }
}

const auth = new PasswordAuth();
auth.run();

const google = new GoogleAuth();
google.run();
