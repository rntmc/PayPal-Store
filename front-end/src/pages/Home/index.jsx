import {Toaster} from 'react-hot-toast'
import { useState } from 'react';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { saveDataToLocalStorage, getDataFromLocalStorage } from '../../../../back-end/localStorage';

import { ProductSection, BuyerInfoSection, Content, Product, BuyerInfo, Background, Header, Footer } from './styles';
import {PayPalPayment} from '../../components/PayPalPayment'
import productImage from '../../assets/laptop.jpg';

export function Home() {
  const [error, setError] = useState('');

  const initialOptions = {
    clientId: "ATm10hXzzOxe-ZwrZRQY5fsj_tJ6h_FLztLTWsgeKm61hfORI4jmhC0X8Me790nOq_c1OrsEfxSBIUaz",
    currency: "USD",
    intent: "capture",
  };

  // Save user information in LocalStorage
  const [buyerInfo, setBuyerInfo] = useState(getDataFromLocalStorage('buyerInfo') || {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    addressLine1: '',
    city: '',
    stateOrProvince: '',
    zipOrPostalCode: '',
    country: 'USA',
  });

  // Change input data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuyerInfo({ ...buyerInfo, [name]: value });
  };

  // Save data
  const handleSave = async () => {
    setError('');
    try {
      if (
        buyerInfo.firstName.trim() !== "" &&
        buyerInfo.lastName.trim() !== "" &&
        buyerInfo.email.trim() !== "" &&
        buyerInfo.phoneNumber.trim() !== "" &&
        buyerInfo.addressLine1.trim() !== "" &&
        buyerInfo.city.trim() !== "" &&
        buyerInfo.stateOrProvince.trim() !== "" &&
        buyerInfo.zipOrPostalCode.trim() !== ""
      ) {
        const validatedAddress = await validateAddress(buyerInfo);
        if (validatedAddress && validatedAddress.status === 'OK') {
          // Valid address. Save data into locaStorage
          saveDataToLocalStorage('buyerInfo', buyerInfo);
          alert('Buyer info saved successfully!');
        } else {
          setError('Endereço inválido. Por favor, verifique e tente novamente.');
        }
      } else {
        setError('Por favor, preencha todos os campos obrigatórios.');
      }
    } catch (error) {
      setError('Erro ao validar o endereço. Por favor, tente novamente.');
    }
  };

  const validateAddress = async (addressInfo) => {
    const apiKey = 'AIzaSyBeNCyfRVOgIW_F2QNeDjZtLBRrkolF9GQ';
    const addressString = `${addressInfo.addressLine1}, ${addressInfo.city}, ${addressInfo.stateOrProvince}, ${addressInfo.zipOrPostalCode}, ${addressInfo.country}`;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(addressString)}&key=${apiKey}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Erro ao validar o endereço. Resposta não foi bem-sucedida.');
      }
      const data = await response.json();
  
      console.log('Response from Google Maps Geocoding API:', data);
  
      // Verificar se o status da resposta é "OK"
      if (data.status === 'OK') {
        // Verificar se a resposta contém resultados
        if (data.results.length > 0) {
          // Acessar o endereço formatado
          const formattedAddress = data.results[0].formatted_address;
          console.log('Formatted Address:', formattedAddress);
  
          // Verificar se o endereço formatado corresponde ao endereço fornecido pelo usuário
          const providedAddress = `${addressInfo.addressLine1}, ${addressInfo.city}, ${addressInfo.stateOrProvince} ${addressInfo.zipOrPostalCode}, ${addressInfo.country}`;
          console.log("providedAddress:", providedAddress)

          if (formattedAddress.toLowerCase() === providedAddress.toLowerCase()) {
            // Valid address
            return data;
          } else {
            throw new Error('Endereço inválido. Por favor, verifique e tente novamente.');
          }
        } else {
          throw new Error('Nenhum resultado encontrado para o endereço fornecido.');
        }
      } else {
        throw new Error(`Status da resposta: ${data.status}`);
      }
    } catch (error) {
      throw new Error(`Erro ao validar o endereço: ${error.message}`);
    }
};

  

  return (
    <PayPalScriptProvider options={initialOptions} >
      <Toaster/>
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

            <PayPalPayment buyerInfo={buyerInfo}/>
            
          </ProductSection>
          <BuyerInfoSection>
            <BuyerInfo>
              <h2>Buyer Information</h2>
              <p> Please fill out every box below to proceed to checkout</p>

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
                name="city"
                value={buyerInfo.city}
                onChange={handleInputChange}
                placeholder="City"
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
              {error && <p style={{ color: 'red' }}>{error}</p>}
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