import axios from 'axios';

export type newTech = {
  name: string;
  icon: string;
  color: string;
};

export const fetchTechnologies = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API}/technologies`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar tecnologias:', error);
  }
};

export const createTechnology = async (tech: newTech) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API}/technologies`, tech, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar tecnologia:', error);
  }
};

export const deleteTechnology = async (technologyId: string) => {
  try {
    await axios.post(
      `${import.meta.env.VITE_API}/technologies-delete`,
      {
        id: technologyId,
      },
      {
        withCredentials: true,
      },
    );
  } catch (error) {
    console.error('Erro ao deletar tecnologia:', error);
  }
};
