import express from "express";
import "dotenv/config";
import { v4 as uuidv4 } from 'uuid'

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
  console.log("Dados recebidos em createOrder:", data);
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
          reference_id: uuidv4(),
          amount: {
            currency_code: "USD",
            value: Number(data.product[0].cost * data.product[0].quantity), //from PayPalPayment.jsx
            quantity: data.product[0].quantity,
            sku: data.product[0].sku,
          },
          shipping: {
            name: {
              full_name: data.buyerInfo.firstName + " " + data.buyerInfo.lastName,
            },
            address: {
              address_line_1: data.buyerInfo.addressLine1,
              admin_area_1: data.buyerInfo.stateOrProvince,
              admin_area_2: data.buyerInfo.addressLine2,
              postal_code: data.buyerInfo.zipOrPostalCode,
              country_code: data.buyerInfo.country,
            },
          },
        },
      ],
    }),
  });
  console.log("UUID gerado:", uuidv4());
  console.log("Resposta do PayPal:", response);
  
  const jsonResponse = await response.json();
  console.log("jsonResponse:", jsonResponse)
  return jsonResponse;
}

export async function capturePayment(orderId ) {
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
  console.log("Dados do pagamento capturado:", data)
  return data;
}
