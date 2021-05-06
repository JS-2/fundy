import { User } from "../common/types";
import axios, { AxiosError, AxiosInstance } from 'axios';

const instance = axios.create();

export const loginSubmit = (user: User) => {
  instance
    .post('user/signup', user)
    .then(() => { console.log('ok') })
    .catch((e: AxiosError) => { console.log(e.response!.status) });
}

export const registSubmit = (user: User) => {
  instance
    .post('user/signup', user)
    .then(() => { console.log('ok') })
    .catch((e: AxiosError) => { console.log(e.response!.status) });
}

export const validateId = (id: string): boolean => {
  let regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  if (regExp.test(id)) return true;
  else return false;
}

export const validatePassword = (password: string): boolean => {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(password) ? true : false;
}

export const validateNickName = (nickName: string): boolean => {
  return /^[ㄱ-ㅎ|가-힣|a-z]{2,8}$/.test(nickName) ? true : false;

}