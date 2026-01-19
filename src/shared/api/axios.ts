import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://696d653cf4a79b3151811c0d.mockapi.io/api/inftcs/:endpoint',
});
