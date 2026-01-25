// Adapter позволяет объектам с несовместимыми интерфейсами работать вместе,
// не изменяя их исходный код

type Pagination = {
  page: number;
  pageSize: number;
};

type ApiResponsePagination = {
  page_index: number;
  per_page: number;
};

class PaginationAdapter implements Pagination {
  page: number;
  pageSize: number;

  constructor(pagination: ApiResponsePagination) {
    this.page = pagination.page_index;
    this.pageSize = pagination.per_page;
  }
}
