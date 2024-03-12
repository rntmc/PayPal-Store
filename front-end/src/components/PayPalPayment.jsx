import { PayPalButtons } from "@paypal/react-paypal-js";
import toast from 'react-hot-toast'

export function PayPalPayment() {
  // const serverUrl = "https://localhost:8888" to run the project locally
  const serverUrl = "https://paypal-store-1.onrender.com"

  function createOrder(data) {
    const buyerInfo = JSON.parse(localStorage.getItem('buyerInfo'))
    if (!buyerInfo) {
      toast.error('Failed to create order: Buyer information is missing');
      return;
    }

    return fetch(`${serverUrl}/create-paypal-order`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: [ 
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
    console.log("createOrder response:", order);
    return order.id;
  });
  }
  function onApprove(data) {
    console.log("onApprove data:", data)

    const buyerInfo = JSON.parse(localStorage.getItem('buyerInfo'));
    console.log("testing buyerInfo on onApprove:", buyerInfo)

    return fetch(`${serverUrl}/capture-paypal-order`, {
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
      console.log("onApprove response:", response)
      const paymentValue = response.purchase_units[0].payments.captures[0].amount.value;
      toast.success(`${response.payer.name.given_name + " " + response.payer.name.surname}, thank you for your purchase!\n
        Your order ID is: ${response.id}
        Product: Brand new laptop
        Quantity: 1
        sku: 5651251
        Total cost: USD ${paymentValue}
        `, {
          duration: 6000
        });
      // The message will be returned with my name, because the PayPal sandbox account is under my user.
    })
    .catch((error) => {
      console.error('Error capturing PayPal order:', error);
      toast.error('Error processing your payment. Please try again.');
    });
  }

  return (
    <PayPalButtons
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  )
}
