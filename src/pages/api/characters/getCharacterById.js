import { axiosInstance } from '../config';

export default async function handler(req, res) {
  const { id } = req.body;
  const api = axiosInstance();
  
  const response = await api.get(`v1/public/characters/${id}`);

  res.status(response.status).json(response.data);
}