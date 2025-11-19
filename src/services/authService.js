import axios from 'axios';

// Tenta pegar a variável do Railway. Se não existir, usa o antigo como fallback.
const BASE_URL = import.meta.env.VITE_API_URL || 'https://ripe-donella-atitus-fbbf314a.koyeb.app';

export async function signIn(email, password) {
  try {
    // Note que adicionamos /auth aqui
    const response = await axios.post(`${BASE_URL}/auth/signin`, { email, password });
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        throw new Error('Requisição inválida.');
      }
      if (error.response.status === 401) {
        throw new Error('Usuário ou senha incorretos.');
      }
    }
    throw new Error('Erro ao autenticar.');
  }
}

export async function signUp(name, email, password) {
  try {
    // Note que adicionamos /auth aqui
    const response = await axios.post(`${BASE_URL}/auth/signup`, { name, email, password });
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        throw new Error('Requisição inválida.');
      }
      if (error.response.status === 409) {
        throw new Error('Usuário já cadastrado.');
      }
    }
    throw new Error('Erro ao cadastrar usuário.');
  }
}
