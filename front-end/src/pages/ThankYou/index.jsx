// Importe as dependências necessárias
import { getDataFromLocalStorage } from '../../../../back-end/localStorage';

import { Container, Heading, OrderDetails } from './styles';

export function ThankYou() {
  const buyerInfo = getDataFromLocalStorage('buyerInfo');

  return (
    <Container>
      <Heading>Dear {buyerInfo.firstName + " " + buyerInfo.lastName}, thank you for your purchase!</Heading>

        <OrderDetails>
          <h2>Transaction ID: </h2>
          <p>Please see below your order details</p>
          <p>Product: </p>
          <p>Quantity: </p>
          <p>Price: </p>
        </OrderDetails>
      
    </Container>
  );
}
