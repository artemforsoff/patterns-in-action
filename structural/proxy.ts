// Proxy — паттерн, который предоставляет объект-заместитель,
// контролирующий доступ к реальному объекту.

interface UserService {
  getUser(id: string): Promise<any>;
}

class RealUserService implements UserService {
  getUser(id: string): Promise<any> {
    return Promise.resolve({ id });
  }
}

class UserServiceProxy implements UserService {
  private cache = new Map<string, any>();

  constructor(private userService: UserService) {}

  async getUser(id: string) {
    if (!this.cache.has(id)) {
      const user = await this.userService.getUser(id);
      this.cache.set(id, user);
    }
    return this.cache.get(id)!;
  }
}
