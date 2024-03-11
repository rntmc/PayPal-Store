import express from "express";
import * as paypal from '../paypal-api.js';
import cors from 'cors'
const PORT = 8888;
const SERVER_URL = "https://paypal-store-1.onrender.com";

const app = express();

app.use(cors())

app.use(express.json());

app.post("/my-server/create-paypal-order", async (req, res) => {
  try {
    const order = await paypal.createOrder(req.body);
    res.json(order);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
});

app.post("/my-server/capture-paypal-order", async (req, res) => {
  const { orderID } = req.body;
  console.log("orderID de server.js:", orderID)
  try {
    const captureData = await paypal.capturePayment(orderID);
    res.json(captureData);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
});

app.listen(SERVER_URL, () => {
  console.log(`Server listening at ${SERVER_URL}`);
});