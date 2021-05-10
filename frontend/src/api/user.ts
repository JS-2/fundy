import { LoginUser, RegistUser } from "../common/types";
import { AxiosError } from 'axios';
import axiosInstance from './axiosConfig';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, logout } from '../reducers/user'

export const loginSubmit = (user: LoginUser, history: ReturnType<typeof useHistory>, dispatch: ReturnType<typeof useDispatch>) => {
  console.log(user);
  axiosInstance
    .post('api/user/login', user)
    .then((response) => {
      dispatch(setUser(response.data.user, response.data.token));
      history.push('/');
    })
    .catch((e: AxiosError) => { console.log(e.response!.status) });
}

export const registSubmit = (user: RegistUser, history: ReturnType<typeof useHistory>) => {
  console.log(user);
  axiosInstance
    .post('api/user/signup', user)
    .then(() => { history.push('/'); })
    .catch((e: AxiosError) => { console.log(e) });
}

export const logoutSubmit = (dispatch: ReturnType<typeof useDispatch>, history: ReturnType<typeof useHistory>) => {
  dispatch(logout());
  window.location.href='/';
  // history.push('/');
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