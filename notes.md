  Processes:
  1. User get Token
  2. 


To Do list

  Front-end
    [x] Pagina contendo Imagem, descricao, numero e preco
    [x] Formulario com os dados do comprador (first and last name, email, phone)
    [x] Formulario contendo dados do envio (address line 1 and 2, state or province, zip or postal code, country)
    [] Assegurar que o endereco e valido para os EUA
    [x] Informacoes do usuario podem ser editadas no form
    [x] Botao do PayPal para iniciar o processo de pagamento e esse botao deve ser renderizado pelo SDK do PayPal (paypal.com/sdk/js)

  Back-end
    [x] utilizar PayPal sandbox
    [x] Incluir credenciais da conta do PayPal sandbox em um arquivo para verificacao
    [] PayPal API que autentica usando oauth2 (client-id and secret keys) deve ser implementado para gerar um token de acesso (on demand or cached) e fazer subsequent API call.
    [] Pagamento deve iniciar ao clicar no botao mencionado acima, que iniciara o setup da API do PayPal
    [] Informacao do comprador (Dados + Endereco) devem ser transmitidos ao PayPal para evitar que usuario insira essa informacao novamente (Entretanto usuario com endereco de entrega diferente pod eser possivel no checkout)
    [] Apos a aprovacao do pagamento pelo PayPal, o servidor deve executar o pagamento de modo a criar a transacao.
    [] Uma mensagem de "thank you" apos finalizar a compra
    [] Os dados da compra (incluso transaction ID) deve ser mostrada ao usuario na mensagem
    [] Subir o projeto numa nuvem publica
