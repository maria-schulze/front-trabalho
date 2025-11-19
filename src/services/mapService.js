import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://ripe-donella-atitus-fbbf314a.koyeb.app';
const BASE_URL = `${API_URL}/ws/point`;

export async function getPoints() {
  try {
    const response = await axios.get(BASE_URL);
    return response.data.map(point => ({
      id: point.id,
      title: point.description || "Ponto",
      position: {
        lat: point.latitude,
        lng: point.longitude,
      },
      userId: point.user?.id // Pega o ID de quem criou
    }));
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao buscar pontos');
  }
}

export async function postPoint(pointData, userId) {
  try {
    const payload = {
      description: pointData.descricao,
      latitude: pointData.latitude,
      longitude: pointData.longitude,
      user: { id: userId } // Envia o dono do ponto
    };

    const response = await axios.post(BASE_URL, payload);
    return {
         id: response.data.id,
         descricao: response.data.description,
         latitude: response.data.latitude,
         longitude: response.data.longitude,
         userId: userId
    };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Erro ao cadastrar ponto');
  }
}

export async function deletePoint(id) {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    throw new Error('Erro ao deletar ponto');
  }
}
