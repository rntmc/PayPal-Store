import * as paypal from './paypal-api.js';

main()

async function main() {
  let order = await paypal.createOrder();
  paypal.capturePayment(order.id)
}