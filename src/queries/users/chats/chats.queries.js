import axios from 'axios';
import { config } from '../../config.queries';

const urlIndex = `http://localhost:8080`;

export const getChatQueries = async ({ token, setChatsData }) => {
  const url = `${urlIndex}/chats`;

  config.headers['Authorization'] = `Bearer ${token}`;

  const { data } = await axios.get(url, config);
  setChatsData(data.chats);

  return data.results;
};

export const postNewChat = async ({ data, token, setChatsData }) => {
  try {
    const url = `${urlIndex}/chats`;

    config.headers['Authorization'] = `Bearer ${token}`;

    const body = data;

    setChatsData(data.chats);

    await axios.post(url, body, config);
  } catch (error) {}
};

export const postMessage = async (data, id, token) => {
  try {
    const url = `${urlIndex}/chats/${id}`;

    config.headers['Authorization'] = `Bearer ${token}`;

    const body = { message: data };

    await axios.post(url, body, config);
  } catch (error) {
    console.log(error);
  }
};

export const deleteChat = async (id, token) => {
  try {
    const url = `${urlIndex}/chats/${id}`;

    config.headers['Authorization'] = `Bearer ${token}`;

    await axios.delete(url, config);
  } catch (error) {
    console.log(error);
  }
};
