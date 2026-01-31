// Посредник — это поведенческий паттерн проектирования,
// который позволяет уменьшить связанность множества классов между собой,
// благодаря перемещению этих связей в один класс-посредник.

class Filter {
  constructor(private mediator: Mediator) {}

  change(value: string) {
    this.mediator.notify({ type: 'FILTER_CHANGED', value });
  }
}

class Toolbar {
  constructor(private mediator: Mediator) {}

  enableDelete() {
    console.log('enable delete');
  }

  disableDelete() {
    console.log('disable delete');
  }

  clickDelete() {
    this.mediator.notify({ type: 'DELETE_CLICKED' });
  }
}

class Pagination {
  reset() {
    console.log('reset to page 1');
  }
}

class Table {
  constructor(private mediator: Mediator) {}

  load(page: number, filter: string) {
    console.log('load data', { page, filter });
  }

  selectRow(rowId: number) {
    this.mediator.notify({ type: 'ROW_SELECTED', rowId });
  }

  clearSelection() {
    console.log('clear table selection');
  }
}

type PageEvent =
  | { type: 'FILTER_CHANGED'; value: string }
  | { type: 'PAGE_CHANGED'; page: number }
  | { type: 'ROW_SELECTED'; rowId: number }
  | { type: 'DELETE_CLICKED' };

interface Mediator {
  notify(event: PageEvent): void;
}

class PageMediator implements Mediator {
  private page = 1;
  private filter = '';
  private hasSelection = false;

  constructor(
    private table: Table,
    private pagination: Pagination,
    private toolbar: Toolbar,
  ) {}

  notify(event: PageEvent): void {
    switch (event.type) {
      case 'FILTER_CHANGED':
        this.filter = event.value;
        this.page = 1;

        this.pagination.reset();
        this.table.clearSelection();
        this.toolbar.disableDelete();

        this.table.load(this.page, this.filter);
        break;

      case 'PAGE_CHANGED':
        this.page = event.page;

        this.table.clearSelection();
        this.toolbar.disableDelete();

        this.table.load(this.page, this.filter);
        break;

      case 'ROW_SELECTED':
        this.hasSelection = true;
        this.toolbar.enableDelete();
        break;

      case 'DELETE_CLICKED':
        if (!this.hasSelection) return;

        console.log('delete selected rows');

        this.hasSelection = false;
        this.table.clearSelection();
        this.toolbar.disableDelete();
        break;
    }
  }
}
