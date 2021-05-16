import { LoginUser, RegistUser, User } from "../common/types";
import axios, { AxiosError } from 'axios';
import axiosInstance from './axiosConfig';
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, logout } from '../reducers/user'

export const loginSubmit = (user: LoginUser) => {
  console.log('losub', user);
  return axiosInstance
    .post('login', user);
}
export const registSubmit = (user: RegistUser, history: ReturnType<typeof useHistory>) => {
  console.log(user);
  axiosInstance
    .post('signup', user)
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

export const getFavorite = (auth_token: string) => {
  return axiosInstance
    .get('/user/my-idol', {
      headers: {
        Authorization: auth_token
        }
      });
}

export const setFavorite = (auth_token: string, idol_id: number, favorite: boolean) => {
  if (!favorite) {
    return axiosInstance
      .post('/user/my-idol/' + idol_id, {}, {
        headers: {
          Authorization: auth_token
          }
        })
  } else {
    return axiosInstance
      .delete('/user/my-idol/' + idol_id, {
        headers: {
          Authorization: auth_token
          }
        })
  }
}

export const getFavoriteFunding = (auth_token: string) => {
  return axiosInstance
      .get('/user/my-funding',{
        headers: {
          Authorization: auth_token
          }
        });
}

export const setFavoriteFunding = (auth_token: string, funding_id: string, favorite: boolean) => {
  console.log('favorite', favorite);
  if (!favorite) {
    console.log('post');
    console.log(auth_token);
    return axiosInstance
      .post('/user/my-funding/' + funding_id, {}, {
        headers: {
          Authorization: auth_token
          }
        })
  } else {
    console.log('delete');
    return axiosInstance
      .delete('/user/my-funding/' + funding_id, {
        headers: {
          Authorization: auth_token
          }
        })
  }
}

export const passwordCheck = (email: string, password: string) => {
  const user: LoginUser = {
    userEmail: email,
    userPassword: password
  }
  console.log(user);
  return axiosInstance.post('/login', user);
}

export const checkNickName = (nickName: string, auth_token: string) => {
  return axiosInstance.get('/check-nickname/' + nickName, {
    headers: {
      Authorization: auth_token
      }
    });
}

export const modifyPassword = (password: string, auth_token: string) => {
  return axiosInstance.patch('/user/password', { password: password }, {
    headers: {
        'Content-Type': 'application/json',
        Authorization: auth_token
    }
});
}

export const modifyNickName = (nickName: string, auth_token: string) => {
  return axiosInstance.patch('/user/nickname',{ nickname: nickName }, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth_token
    }
});
}

export const setThumbnail = (file: any, auth_token: string) => {
  const frm = new FormData();
  frm.append('multipartFile', file);
  return axiosInstance.patch('/user/user-picture', frm, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: auth_token
    }
})
}

export const getCerts = (auth_token: string) => {
  return axiosInstance
    .get('/user', {
      headers: {
        Authorization: auth_token
        }
      });
}
