class BasketItem {
  constructor(event, ticketCount) {
    this.event = { ...event }; // Cloner l'objet pour éviter de modifier l'original
    this.ticketCount = ticketCount < 0 ? 0 : ticketCount;
    this.event.ticketPrice = event.ticketPrice < 0 ? 0 : event.ticketPrice;
  }

  getPrice() {
    return this.event.ticketPrice * this.ticketCount;
  }
}

const _BasketItem = BasketItem;
export { _BasketItem as BasketItem };