import { LoginUser, RegistUser, User } from "../common/types";
import axios, { AxiosError } from 'axios';
import axiosInstance from './axiosConfig';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, logout } from '../reducers/user'

export const loginSubmit = (user: LoginUser, history: ReturnType<typeof useHistory>, dispatch: ReturnType<typeof useDispatch>) => {
  console.log(user);
  axiosInstance
    .post('user/login', user)
    .then((response) => {
      dispatch(setUser(response.data.user, response.data.token));
      history.push('/');
    })
    .catch((e: AxiosError) => { console.log(e.response!.status) });
}

export const registSubmit = (user: RegistUser, history: ReturnType<typeof useHistory>) => {
  console.log(user);
  axiosInstance
    .post('user/signup', user)
    .then(() => { history.push('/'); })
    .catch((e: AxiosError) => { console.log(e) });
}

export const logoutSubmit = (dispatch: ReturnType<typeof useDispatch>) => {
  window.location.href='/';
  dispatch(logout());
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
  return /^[가-힣|a-z]{2,8}$/.test(nickName) ? true : false;

}

export const getFavorite = (user_id: number) => {
  return axiosInstance
      .get('/user/' + user_id + '/my-idol');
}

export const setFavorite = (user_id: number, idol_id: number, favorite: boolean) => {
  if (!favorite) {
    return axiosInstance
      .post('/user/' + user_id + '/my-idol/' + idol_id)
  } else {
    return axiosInstance
      .delete('/user/' + user_id + '/my-idol/' + idol_id)
  }
}

export const passwordCheck = (email: string, password: string) => {
  const user: LoginUser = {
    userEmail: email,
    userPassword: password
  }
  return axiosInstance.post('user/login', user);
}

export const checkNickName = (nickName: string) => {
  return axiosInstance.get('user/check-nickname/' + nickName);
}

export const modifyPassword = (password: string, user_id: number) => {
  return axiosInstance.patch('user/' + user_id + '/password', { password: password }, {
    headers: {
        'Content-Type': 'application/json',
    }
});
}

export const modifyNickName = (nickName: string, user_id: number) => {
  return axiosInstance.patch('user/' + user_id + '/nickname', { nickname: nickName }, {
    headers: {
        'Content-Type': 'application/json',
    }
});
}