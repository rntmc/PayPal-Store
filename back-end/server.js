const express = require("express");
const {config} = require("dotenv")
config();
const app = express();

const {PORT, CLIENT_ID, APP_SECRET, PAYPAL_API_URL } = process.env

// // test route
// app.get("/test", async (req, res) => {
//   const data = await generateAccessToken();
//   console.log(data);
//   res.json(data);
// });

async function createOrder() {
  const accessToken = await generateAccessToken();
  const url = `${PAYPAL_API_URL}/v2/checkout/orders`;
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "250.00",
          },
        },
      ],
    }),
  });
  const data = await response.json();
  console.log(data);
  return data;
}

async function capturePayment(orderId) {
  const accessToken = await generateAccessToken();
  const url = `${PAYPAL_API_URL}/v2/checkout/orders/${orderId}/capture`;
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
}

async function generateAccessToken() {
  const response = await fetch(PAYPAL_API_URL + "/v1/oauth2/token", {
    method: "post",
    body: "grant_type=client_credentials",
    headers: {
      Authorization:
        "Basic " + Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64"),
    },
  });
  const data = await response.json();
  return data.access_token;
}

app.listen(3333, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

module.exports = { createOrder, capturePayment };
