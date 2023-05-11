import axios from 'axios';
import { config } from '../config.queries';

const urlIndex = 'http://localhost:8080';

export const getUserQueries = async ({ token, setUserData }) => {
  const url = `${urlIndex}/users`;

  config.headers['Authorization'] = `Bearer ${token}`;

  const { data } = await axios.get(url, config);
  setUserData(data);

  return data.results;
};

export const postUser = async (data) => {
  try {
    const url = `${urlIndex}/signup`;

    const body = data;

    await axios.post(url, body, config);
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async ({ data, setLoginData }) => {
  try {
    const url = `${urlIndex}/login`;

    const body = data;

    const res = await axios.post(url, body, config);
    setLoginData(res.result);
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (token) => {
  try {
    const url = `${urlIndex}/users`;

    config.headers['Authorization'] = `Bearer ${token}`;

    await axios.delete(url, config);
  } catch (error) {
    console.log(error);
  }
};
