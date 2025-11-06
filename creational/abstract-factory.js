// Abstract Factory — создаёт семейства взаимосвязанных объектов без указания их конкретных классов.
// То есть клиентский код работает через общий интерфейс, не зная, какая именно реализация под капотом.

class CarFactory {
  createEngine() {}
  createCar() {}
}

class ElectricCarFactory extends CarFactory {
  createEngine() {
    return '🔋 Electric engine started';
  }
  createCar() {
    return '🚗 Driving electric car';
  }
}

class GasCarFactory extends CarFactory {
  createEngine() {
    return '🔋 Gas engine started';
  }
  createCar() {
    return '🚗 Driving gas car';
  }
}

const createCar = (factory) => {
  console.log(factory.createEngine());
  console.log(factory.createCar());
};

createCar(new ElectricCarFactory());
createCar(new GasCarFactory());

// Output:
// 🔋 Electric engine started
// 🚗 Driving electric car
// 🔋 Gas engine started
// 🚗 Driving gas car
