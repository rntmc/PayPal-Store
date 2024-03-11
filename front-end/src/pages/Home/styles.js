import styled from 'styled-components'

export const Background = styled.div`
background-color: #f0f0f0;
min-height: 100vh;
display: flex;
flex-direction: column;
`;

export const Header = styled.header`
background-color: #333;
color: #fff;
padding: 20px;
text-align: center;
`;

export const Footer = styled.footer`
background-color: #333;
color: #fff;
padding: 10px 20px;
text-align: center;
`;

export const Content = styled.div`
flex-grow: 1;
display: flex;
flex-direction: column;
align-items: center;
`;

export const ProductSection = styled.div`
background-color: #fff;
border-radius: 10px;
padding: 40px;
margin-bottom: 20px;
max-width: 600px;
width: 100%;
`;

export const BuyerInfoSection = styled.div`
background-color: #fff;
border-radius: 10px;
padding: 40px;
max-width: 600px;
width: 100%;
`;

export const Product = styled.div`
display: flex;
align-items: center;
margin-bottom: 20px;

img {
  width: 100px;
  height: 100px;
  margin-right: 20px;
  border-radius: 5px;
  object-fit: cover;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

p {
  margin: 5px 0;
}
`;

export const BuyerInfo = styled.div`
margin-top: 20px;

h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

input {
  display: block;
  width: calc(100% - 20px);
  margin: 0 auto 10px;
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button{
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}
`;