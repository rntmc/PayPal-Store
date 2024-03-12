## To Do list

### Front-end
- [x] Page containeing Image, description, quantity and price;
- [x] Form with buyer data(first and last name, email, phone);
- [x] Form with shipping data (address line 1 and 2, state or province, zip or postal code, country);
- [x] Ensure the address informed is valid;
- [x] User data can be edited by the user;
- [x] PayPal button to start the payment process and it must be rendered by PayPal SDK(paypal.com/sdk/js)

### Back-end
- [x] Use PayPal sandbox;
- [x] Include PayPal sandbox credentias for verification;
- [x] PayPal API that authenticate using oauth2 (client-id and secret keys) to generate an access token (on demand or cached) and subsequent API call;
- [x] Payment must start when user clicks on PayPal button, which will start PayPal API setup;
- [x] Buyer info (data + address) must be transmited to PayPal to avoid user having to input their info again (although a buyer account with different shipping information might be used for checkout);
- [x] Once payment is approved by PayPal, the server must execute the payment to create a transation;
- [x] A thank you message when purchase is complete;
- [x] Purchase data (transaction ID included) must be included in the message;
- [x] Deploy the project on a cloud service;
