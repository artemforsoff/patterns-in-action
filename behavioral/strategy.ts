// Strategy — это паттерн, который позволяет подменять алгоритм поведения,
// не меняя объект, который его использует.

interface DeliveryStrategy {
  deliver(payload: string): void;
}

class CarDelivery implements DeliveryStrategy {
  deliver(payload: unknown) {
    console.log(`Delivering a ${payload} on car`);
  }
}

class DroneDelivery implements DeliveryStrategy {
  deliver(payload: unknown) {
    console.log(`Delivering a ${payload} on drone`);
  }
}

class DeliveryService {
  constructor(private strategy: DeliveryStrategy) {}

  setStrategy(strategy: DeliveryStrategy) {
    this.strategy = strategy;
  }

  deliver(payload: string) {
    this.strategy.deliver(payload);
  }
}

const service = new DeliveryService(new CarDelivery());
service.deliver('food');

service.setStrategy(new DroneDelivery());
service.deliver('medicine');
