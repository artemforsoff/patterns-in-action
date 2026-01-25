// Facade предоставляет упрощённый, единый интерфейс
// к сложной подсистеме из нескольких классов / сервисов.

class CartApi {
  addItem() {}
}

class InventoryApi {
  reserveItem() {}
}

class PaymentApi {
  pay() {}
}

class CheckoutFacade {
  constructor(
    private inventoryApi: InventoryApi,
    private cartApi: CartApi,
    private paymentApi: PaymentApi,
  ) {}

  checkout() {
    this.inventoryApi.reserveItem();
    this.cartApi.addItem();
    return this.paymentApi.pay();
  }
}

const checkout = new CheckoutFacade(
  new InventoryApi(),
  new CartApi(),
  new PaymentApi(),
);

checkout.checkout();
