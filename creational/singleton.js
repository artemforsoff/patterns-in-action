// Гарантия единственного экземпляра класса + глобальная точка доступа.
class ConfigService {
  static #instance;

  constructor(config) {
    if (ConfigService.#instance) {
      throw new Error('Use ConfigService.getInstance()');
    }

    this.config = config;
  }

  static getInstance(config) {
    if (!ConfigService.#instance) {
      if (!config) {
        throw new Error('Config must be provided on first call');
      }

      ConfigService.#instance = new ConfigService(config);
    }

    return ConfigService.#instance;
  }

  get(key) {
    return this.config[key];
  }
}

ConfigService.getInstance({ apiUrl: '', env: 'dev' });
ConfigService.getInstance();
