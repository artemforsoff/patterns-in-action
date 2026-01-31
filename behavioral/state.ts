// Состояние — это поведенческий паттерн проектирования,
// который позволяет объектам менять поведение в зависимости от своего состояния.
// Извне создаётся впечатление, что изменился класс объекта.

// State позволяет объекту менять своё поведение в зависимости от внутреннего состояния,
// не используя if / switch / флаги.

// Участники паттерна

// 🧠 Context
// Основной объект (Order, Player, Request)

// 🎭 State
// Интерфейс поведения

// 🎬 ConcreteState
// Реализация поведения для конкретного состояния

interface TrafficLightState {
  next(): void;
}

class TrafficLight {
  private state: TrafficLightState;

  constructor() {
    this.state = new RedState(this);
  }

  setState(state: TrafficLightState) {
    this.state = state;
  }

  next() {
    this.state.next();
  }
}

class RedState implements TrafficLightState {
  constructor(private light: TrafficLight) {}

  next() {
    console.log('Red → Yellow');
    this.light.setState(new YellowState(this.light));
  }
}

class YellowState implements TrafficLightState {
  constructor(private light: TrafficLight) {}

  next() {
    console.log('Yellow → Green');
    this.light.setState(new GreenState(this.light));
  }
}

class GreenState implements TrafficLightState {
  constructor(private light: TrafficLight) {}

  next() {
    console.log('Green → Red');
    this.light.setState(new RedState(this.light));
  }
}
