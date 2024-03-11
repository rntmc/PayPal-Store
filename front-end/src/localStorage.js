// Função para salvar os dados no LocalStorage
export const saveDataToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Função para recuperar os dados do LocalStorage
export const getDataFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};