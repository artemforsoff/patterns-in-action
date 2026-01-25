// Decorator — паттерн, который позволяет динамически добавлять новое поведение объекту,
// не изменяя его исходный код и не используя наследование

interface Analytics {
  track(event: string): void;
}

class ConsoleAnalytics implements Analytics {
  track(event: string) {
    console.log(event);
  }
}

class TimingAnalyticsDecorator implements Analytics {
  constructor(private analytics: Analytics) {}

  track(event: string) {
    const start = performance.now();
    this.analytics.track(event);
    const end = performance.now();

    console.log(`Analytics "${event}" took ${end - start}ms`);
  }
}

const analytics = new TimingAnalyticsDecorator(new ConsoleAnalytics());
