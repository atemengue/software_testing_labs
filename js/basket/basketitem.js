class BasketItem {

  constructor(event, ticketCount) {
    this.event = event;
    this.ticketCount = ticketCount;
  }

  getPrice() {
    return this.event.ticketPrice * this.ticketCount;
  }

}

const _BasketItem = BasketItem;
export { _BasketItem as BasketItem };
