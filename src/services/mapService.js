import axios from 'axios';

// Tenta pegar a URL do Railway. Se não existir, usa o antigo como fallback.
// Nota: No Railway, VITE_API_URL será https://rest-api-spring... (sem barra no final)
const API_URL = import.meta.env.VITE_API_URL || 'https://ripe-donella-atitus-fbbf314a.koyeb.app';

// Monta o endereço completo do endpoint de pontos
const BASE_URL = `${API_URL}/ws/point`;

export async function getPoints(token) {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Mapeia os dados vindos do Java (latitude/longitude) para o formato do Google Maps
    const points = response.data.map(point => ({
      id: point.id,
      title: point.description || "Ponto sem nome", // Backend envia 'description'
      position: {
        lat: point.latitude,
        lng: point.longitude,
      },
    }));

    if (response.status === 200) {
      return points;
    } else {
      throw new Error('Erro ao buscar pontos');
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao buscar pontos');
  }
}

export async function postPoint(token, pointData) {
  try {
    // Prepara o objeto para enviar ao Java
    const payload = {
      description: pointData.descricao, // Java espera 'description'
      latitude: pointData.latitude,
      longitude: pointData.longitude
    };

    const response = await axios.post(BASE_URL, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      // Retorna o dado salvo adaptado para o Front atualizar o estado
      return {
         id: response.data.id,
         descricao: response.data.description,
         latitude: response.data.latitude,
         longitude: response.data.longitude
      };
    } else {
      throw new Error('Erro ao cadastrar ponto');
    }
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao cadastrar ponto');
  }
}
