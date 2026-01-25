// Создание объектов путём клонирования существующих экземпляров.
interface Cloneable<T> {
  clone(): T;
}

class Pagination implements Cloneable<Pagination> {
  constructor(
    public page: number,
    public pageSize: number,
  ) {}

  clone(overrides?: Partial<Pagination>): Pagination {
    return new Pagination(
      overrides?.page ?? this.page,
      overrides?.pageSize ?? this.pageSize,
    );
  }
}
