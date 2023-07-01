import axios from 'axios';

export function axiosInstance() {
  return axios.create({
     baseURL: 'http://localhost:3000',
   });
 }

export async function getCharacters(offset, limit) {
  try {
    const api = axiosInstance();
    let response = await api.post('api/characters/getCharacters', { offset, limit });
    return response?.data?.data;
  }
  catch (error) {
    console.log(error);
  }
}

export async function getCharactersByName(name) {
  try {
    const api = axiosInstance();
    let response = await api.post('api/characters/getCharactersByName', { name });
    return response?.data?.data;
  }
  catch (error) {
    console.log(error);
  }
}

export async function getCharacterById(id) {
  try {
    const api = axiosInstance();
    let response = await api.post('api/characters/getCharacterById', { id });
    return response?.data?.data;
  }
  catch (error) {
    console.log(error);
  }
}