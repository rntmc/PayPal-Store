import { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { saveDataToLocalStorage, getDataFromLocalStorage } from '../../../../back-end/localStorage';

import { ProductSection, BuyerInfoSection, Content, Product, BuyerInfo, Background, Header, Footer } from './styles';
import {PayPalPayment} from '../../components/PayPalPayment'
import productImage from '../../assets/laptop.jpg';

export function Home() {
  const initialOptions = {
    clientId: "ATm10hXzzOxe-ZwrZRQY5fsj_tJ6h_FLztLTWsgeKm61hfORI4jmhC0X8Me790nOq_c1OrsEfxSBIUaz",
    currency: "USD",
    intent: "capture",
  };

  // Estado para armazenar as informações do comprador
  const [buyerInfo, setBuyerInfo] = useState(getDataFromLocalStorage('buyerInfo') || {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    stateOrProvince: '',
    zipOrPostalCode: '',
    country: 'United States',
  });

  // Função para lidar com a mudança nos campos de entrada
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuyerInfo({ ...buyerInfo, [name]: value });
  };

  // Função para lidar com o salvamento das informações
  const handleSave = () => {
    saveDataToLocalStorage('buyerInfo', buyerInfo);
    alert('Buyer info saved successfully!');
  };


  return (
    <PayPalScriptProvider options={initialOptions}>
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
                <p>Name: Notebook</p>
                <p>Price: $250.00</p>
                <p>Quantity: 1</p>
                <p>Sku: 5651251</p>
              </div>
            </Product>

            <PayPalPayment />
            
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
                name="stateOrProvince"
                value={buyerInfo.stateOrProvince}
                onChange={handleInputChange}
                placeholder="State or Province"
              />
              <input
                type="text"
                name="zipOrPostalCode"
                value={buyerInfo.zipOrPostalCode}
                onChange={handleInputChange}
                placeholder="ZIP or Postal Code"
              />
              <input
                type="text"
                name="country"
                value={buyerInfo.country}
                onChange={handleInputChange}
                placeholder="Country"
                disabled 
              />
              <button onClick={handleSave} type='button'>Save</button>
            </BuyerInfo>
          </BuyerInfoSection>
        </Content>
        <Footer>
          <p>© 2024 Shopping Cart. All rights reserved.</p>
        </Footer>
      </Background>
    </PayPalScriptProvider>
  );
}