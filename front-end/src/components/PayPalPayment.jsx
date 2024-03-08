import { PayPalButtons } from "@paypal/react-paypal-js";
import toast from 'react-hot-toast'

export function PayPalPayment({ buyerInfo }) {

  const serverUrl = "http://localhost:8888"

  function createOrder(data) {
    const buyerInfo = JSON.parse(localStorage.getItem('buyerInfo'))

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
            cost: "30.00",
            // id: "YOUR_PRODUCT_ID",
            // quantity: "YOUR_PRODUCT_QUANTITY",
          },
        ],
        buyerInfo: buyerInfo,
      }),
    })
  .then((response) => response.json())
  .then((order) => order.id);
  }
  function onApprove(data) {
    // console.log("onApprove:", data)
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
    .then((response) => {
      // Show success message
      console.log("response do onApprove:", response)
      toast.success(`Thank you ${response.payer.name.given_name + " " + response.payer.name.surname} for your purchase!
        Your order ID is: ${response.id}\n`, {
          duration: 6000
        });
    })
    .catch((error) => {
      // Handle error
      console.error('Error capturing PayPal order:', error);
      toast.error('Error processing your payment. Please try again.');
    });
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