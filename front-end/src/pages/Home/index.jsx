import { useState } from 'react';

import {ProductSection , BuyerInfoSection , Content, Product, BuyerInfo, Background, Header, Footer} from './styles'

import productImage from '../../assets/laptop.jpg';

export function Home() {
  const [buyerInfo, setBuyerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuyerInfo({ ...buyerInfo, [name]: value });
  };

  return (
    <Background>
      <Header>
        <h1>Shopping Cart</h1>
      </Header>
      <Content>
        <ProductSection>
          <Product>
            <img src={productImage} alt="Product" />
            <div>
              <h2>Product Details</h2>
              <p>Name: Product Name</p>
              <p>Item Number: 123456</p>
              <p>Price: $19.99</p>
            </div>
          </Product>
        </ProductSection>
        <BuyerInfoSection>
          <BuyerInfo>
            <h2>Buyer Information</h2>
            <input
              type="text"
              name="firstName"
              value={buyerInfo.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={buyerInfo.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
            />
            <input
              type="email"
              name="email"
              value={buyerInfo.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <input
              type="tel"
              name="phoneNumber"
              value={buyerInfo.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
            />
            <input
              type="text"
              name="addressLine1"
              value={buyerInfo.addressLine1}
              onChange={handleInputChange}
              placeholder="Address Line 1"
            />
            <input
              type="text"
              name="addressLine2"
              value={buyerInfo.addressLine2}
              onChange={handleInputChange}
              placeholder="Address Line 2"
            />
            <input
              type="text"
              name="state"
              value={buyerInfo.state}
              onChange={handleInputChange}
              placeholder="State or Province"
            />
            <input
              type="text"
              name="zipCode"
              value={buyerInfo.zipCode}
              onChange={handleInputChange}
              placeholder="Zip or Postal Code"
            />
            <input
              type="text"
              name="country"
              value={buyerInfo.country}
              onChange={handleInputChange}
              placeholder="Country"
              disabled
            />
          </BuyerInfo>
        </BuyerInfoSection>
      </Content>
      <Footer>
        <p>© 2024 Shopping Cart. Todos os direitos reservados.</p>
      </Footer>
    </Background>
  );
}