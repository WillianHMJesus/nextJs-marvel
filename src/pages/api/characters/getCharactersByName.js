import { axiosInstance } from '../config';

export default async function handler(req, res) {
  const { name, offset, limit } = req.body;
  const api = axiosInstance();

  const response = await api.get('v1/public/characters', {
    params: {
      'nameStartsWith': name
    }
  });

  res.status(response.status).json(response.data);
}