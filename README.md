# PayPal-Store

This project is an application that simulates the process of purchasing a single product using the PayPal payment method. It was developed using the PayPal sandbox environment.
The main objective of this application is to test PayPal payment functionality.


## Features
- The customer fills in their details on the initial screen, including name, email, phone number, and full address.
- Address details are validated using the Google Maps API.
- If the data passes validation, clicking on the PayPal button initiates the purchase creation process.
- The user follows the normal PayPal process, entering their registered username and password.
- The next step is to confirm the purchase details, such as payment method, amount, and address.
- The address is transmitted from the form to the PayPal platform so the user doesn't need to fill in the details again, but they can alter the information if desired.
- After confirmation by the user, the purchase process is completed with a message returning the user's data and their Transaction ID.

## Technologies Used

### Backend
- Express.js: Framework for web application development in Node.js.
- Cors: Middleware to enable CORS in Express APIs.
- Dotenv: Used to load environment variables from a .env file.
- Node-fetch: Module for making HTTP requests on the server side.
- UUID: Used for generating unique UUIDs.

#### Backend Features
- Generate Access Token: Uses OAuth2 authentication to make subsequent calls.
- Create Order: Uses the generated token to create an order in PayPal.
- Capture Payment: Captures payment data after the purchase order is created.

### Frontend

- React: JavaScript library for building user interfaces.
- Styled-components: Library for styling components with CSS-in-JS.
- React-hot-toast: Used for displaying notifications elegantly.
- @paypal/react-paypal-js: Official PayPal package for payment integration in React.
- @react-google-maps/api: Used for address verification through the Google Maps API.

#### Frontend Features

- The data provided by the customer in the form is saved in localStorage to be used during checkout.
- The user address is verified by comparing the response received from the Google Maps API with the address provided by the user.
- After the user confirms the payment on PayPal, a message containing the purchase details and transaction ID is promptly displayed to the customer. This provides reassurance and confirmation of the successful transaction.

## Environment Variables

Before running the application, ensure you set up the following environment variables in a .env file in the back-end folder:

- PAYPAL_CLIENT_ID: Your PayPal client ID obtained from the PayPal Developer Dashboard.
- PAYPAL_CLIENT_SECRET: Your PayPal client secret obtained from the PayPal Developer Dashboard.

These environment variables are necessary for the integration with PayPal's APIs to generate an access token.

## Access to Deployed Project

- **Frontend**: You can access the deployed version of the frontend application [here](https://paypalstore.netlify.app/).
- **Backend**: The backend of the application is hosted [here](https://paypal-store-1.onrender.com). To access the API endpoints, use this URL as the base.

## Installation and Usage

To run this project locally, please follow the below steps:
- Clone this repository.
- Install frontend and backend dependencies with `npm install`.
- Start the backend server with `npm start`.
- Start the frontend application with `npm run dev`.
- Access the application in your browser at the port provided by the frontend.
