import axios from 'axios';

export function axiosInstance() {
 return axios.create({
    baseURL: 'http://gateway.marvel.com',
    params: {
      'apikey': '0c864007a32fcbf1278d821726408c2c',
      'ts': '1682971089214',
      'hash': '006d1a79edf57f8ea316f031547fc713'
    }
  });
}