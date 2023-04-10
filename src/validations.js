import axios from 'axios';

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

export const validarCPF = (cpf) => {
  if (!cpfRegex.test(cpf)) {
    return false;
  }

  cpf = cpf.replace(/\D+/g, '');

  let sum = 0;
  let rest;
  if (cpf === '00000000000') return false;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
  }
  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) {
    rest = 0;
  }
  if (rest !== parseInt(cpf.substring(9, 10), 10)) {
    return false;
  }

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
  }
  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) {
    rest = 0;
  }
  if (rest !== parseInt(cpf.substring(10, 11), 10)) {
    return false;
  }

  return true;
};

export const validarCNPJ = (cnpj) => {
  if (!cnpjRegex.test(cnpj)) {
    return false;
  }

  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj.length !== 14) return false;

  if (/^(\d)\1+$/.test(cnpj)) return false;

  let size = cnpj.length - 2;
  let numbers = cnpj.substring(0, size);
  const digits = cnpj.substring(size);
  let sum = 0;
  let pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) pos = 9;
  }
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  if (result !== parseInt(digits.charAt(0), 10)) return false;

  size += 1;
  numbers = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += numbers.charAt(size - i) * pos--;
    if (pos < 2) pos = 9;
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  if (result !== parseInt(digits.charAt(1), 10)) return false;

  return true;
};

export const validarCEP = async (cep) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return !!response.data.cep;
  } catch (error) {
    return false;
  }
};


export const formatCPF = (value) => {
    const maxLength = 14;
    let formattedValue = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    formattedValue = formattedValue.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o primeiro ponto
    formattedValue = formattedValue.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o segundo ponto
    formattedValue = formattedValue.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona o traço
    return formattedValue.slice(0, maxLength); // Limita o tamanho máximo da string
  };
  
  export const formatCNPJ = (value) => {
    const maxLength = 18;
    let formattedValue = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    formattedValue = formattedValue.replace(/(\d{2})(\d)/, '$1.$2'); // Adiciona o primeiro ponto
    formattedValue = formattedValue.replace(/(\d{3})(\d)/, '$1.$2'); // Adiciona o segundo ponto
    formattedValue = formattedValue.replace(/(\d{3})(\d)/, '$1/$2'); // Adiciona a barra
    formattedValue = formattedValue.replace(/(\d{4})(\d{1,2})$/, '$1-$2'); // Adiciona o traço
    return formattedValue.slice(0, maxLength); // Limita o tamanho máximo da string
  };
  