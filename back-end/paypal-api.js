import express from "express";
import "dotenv/config";

const app = express();

app.use(express.json());

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
const base = "https://api-m.sandbox.paypal.com";

async function generateAccessToken() {
  const response = await fetch(base + "/v1/oauth2/token", {
    method: "post",
    body: "grant_type=client_credentials",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: "Basic " + Buffer.from(PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET).toString("base64"), 
    }
  });
  const data = await response.json();
  return data.access_token;
};

export async function createOrder(data) {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`
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
            value: data.product.cost, //from PayPalPayment.jsx
          },
        },
      ],
    }),
  });
  const jsonResponse = await response.json();
  return jsonResponse;
}

export async function capturePayment(orderId) {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderId}/capture`
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken},`
    },
  });
  const data = await response.json();
  console.log(data)
  return data;
}
