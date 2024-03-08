import { PayPalButtons } from "@paypal/react-paypal-js";

export function PayPalPayment() {

  const serverUrl = "http://localhost:8888"

  function createOrder(data) {
    return fetch(`${serverUrl}/my-server/create-paypal-order`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      // use the "body" param to optionally pass additional order information
      // like product ids and quantities
      body: JSON.stringify({
        product: [ //cart
          {
            description: "Brand new laptop",
            cost: "250.00"
            // id: "YOUR_PRODUCT_ID",
            // quantity: "YOUR_PRODUCT_QUANTITY",
          },
        ],
      }),
    })
  .then((response) => response.json())
  .then((order) => order.id);
  }
  function onApprove(data) {
    console.log(data)
    return fetch(`${serverUrl}/my-server/capture-paypal-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID,
      })
    })
    .then((response) => response.json())
  }

  return (
    <PayPalButtons
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
      // createOrder={createOrder}
      // onApprove={onApprove}
    />
  )
}