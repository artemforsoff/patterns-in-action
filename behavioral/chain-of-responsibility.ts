// Chain of Responsibility — паттерн, позволяющий передавать запрос по цепочке потенциальных обработчиков,
// избегая жёсткой привязки отправителя запроса к его получателю.

type UserAction = {
  type: 'CLICK' | 'SCROLL' | 'API_CALL';
  isAuthorized: boolean;
  isPremium: boolean;
};

interface Handler {
  setNext(handler: Handler): Handler;
  handle(action: UserAction): void;
}

abstract class BaseHandler implements Handler {
  private next?: Handler;

  setNext(handler: Handler): Handler {
    this.next = handler;
    return handler;
  }

  handle(action: UserAction): void {
    if (this.next) {
      this.next.handle(action);
    }
  }
}

class AuthHandler extends BaseHandler {
  handle(action: UserAction): void {
    if (!action.isAuthorized) {
      console.log('❌ Not authorized');
      return;
    }

    super.handle(action);
  }
}

class PremiumHandler extends BaseHandler {
  handle(action: UserAction): void {
    if (!action.isPremium) {
      console.log('❌ Premium required');
      return;
    }

    super.handle(action);
  }
}

class ActionHandler extends BaseHandler {
  handle(action: UserAction): void {
    console.log(`✅ Action executed: ${action.type}`);
  }
}

const auth = new AuthHandler();
const premium = new PremiumHandler();
const action = new ActionHandler();

auth.setNext(premium).setNext(action);

auth.handle({
  type: 'CLICK',
  isAuthorized: true,
  isPremium: true,
});
