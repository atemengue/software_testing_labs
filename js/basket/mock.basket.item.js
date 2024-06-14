export class MockBasketItem {
    constructor(event, ticketCount) {
        this.event = event;
        this.ticketCount = ticketCount;
    }

    getPrice() {
        return this.event.price * this.ticketCount;
    }
}
