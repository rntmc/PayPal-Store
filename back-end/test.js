const paypal = require("./server.js");

main();

async function main() {
  let order = await paypal.createOrder();
  paypal.capturePayment(order.id)
  console.log(order.id)
}