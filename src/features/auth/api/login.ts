import axios from 'axios';
import { LoginParams } from '../model/types';

export const loginRequest = async (
  params: LoginParams
): Promise<string> => { 
  await axios.request({ method: "GET", url: "/fake-auth", validateStatus: () => true })

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const { login, password } = params;

      if (login === '123' && password === '123') {
        resolve('auth-token');
      } else {
        reject(new Error('Неверный логин или пароль'));
      }
    }, 2000);
  });
};
