import { PayPalButtons } from "@paypal/react-paypal-js";
import toast from 'react-hot-toast'

export function PayPalPayment() {
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
            cost: "250.00",
            quantity: 1,
            sku: 5651251,
          },
        ],
        buyerInfo: buyerInfo,
      }),
    })
  .then((response) => response.json())
  .then((order) => {
    console.log("Resposta de createOrder:", order);
    return order.id;
  });
  }
  function onApprove(data) {
    console.log("onApprove data:", data)

    const buyerInfo = JSON.parse(localStorage.getItem('buyerInfo'));
    console.log("testando o buyerInfo no onApprove:", buyerInfo)

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
      const paymentValue = response.purchase_units[0].payments.captures[0].amount.value;
      toast.success(`${response.payer.name.given_name + " " + response.payer.name.surname}, thank you for your purchase!\n
        Your order ID is: ${response.id}
        Product: Brand new Laptop
        Quantity: 1
        sku: 5651251
        Total cost: USD ${paymentValue}
        `, {
          duration: 6000
        });
      // navigate('/thank-you')
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