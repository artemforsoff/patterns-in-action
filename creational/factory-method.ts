// Создание объектов через переопределяемый фабричный метод

interface AnalyticsProvider {
  track(event: string, payload: unknown): void;
}

class ConsoleAnalytics implements AnalyticsProvider {
  track(event: string, payload: unknown): void {
    console.log('[DEV]', event, payload);
  }
}

class MatomoAnalytics implements AnalyticsProvider {
  constructor(
    private readonly url: string,
    private readonly siteId: number,
    private readonly retry: number,
  ) {}

  track(event: string, payload: unknown): void {
    console.log('[MATOMO]', this.url, this.siteId, event, payload);
  }
}

class PostHogAnalytics implements AnalyticsProvider {
  constructor(
    private readonly url: string,
    private readonly key: string,
  ) {}

  track(event: string, payload: unknown): void {
    console.log('[PostHog]', this.url, this.key, event, payload);
  }
}

abstract class AnalyticsFactory {
  private provider?: AnalyticsProvider;

  protected abstract createProvider(): AnalyticsProvider;

  track(event: string, payload: unknown) {
    if (!this.provider) {
      this.provider = this.createProvider();
    }

    this.provider.track(event, payload);
  }
}

class ProdAnalyticsFactory extends AnalyticsFactory {
  protected createProvider(): AnalyticsProvider {
    const region = 'EU';
    if (region === 'EU') {
      return new MatomoAnalytics('https://matomo.eu', 42, 3);
    }

    return new PostHogAnalytics('https://posthog.com', 'key-123');
  }
}

class DevAnalyticsFactory extends AnalyticsFactory {
  protected createProvider(): AnalyticsProvider {
    return new ConsoleAnalytics();
  }
}

const env = 'prod';

const analytics =
  env === 'prod' ? new ProdAnalyticsFactory() : new DevAnalyticsFactory();

analytics.track('page_open', { page: '/home' });
