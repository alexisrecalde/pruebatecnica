import axios from 'axios';

export const config = {
  headers: {
    'content-type': 'application/json'
  }
};

export const postUser = async (data) => {
  try {
    const url = `http://localhost:8080/signup`;

    const body = data;

    await axios.post(url, body, config);
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (data) => {
  try {
    const url = `http://localhost:8080/login`;

    const body = data;

    await axios.post(url, body, config);
  } catch (error) {
    console.log(error);
  }
};
