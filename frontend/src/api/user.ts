export class User {
    email: string;
    password: string;
    nickName?: string;

    constructor(email: string = '', password: string = '') {
      this.email = email;
      this.password = password;
    }
}

export const loginSubmit = (user: User) => {
    console.log(user);
}

export const registSubmit = (user: User) => {
    console.log(user);
}

export const validateId = (id: string): boolean => {
  let regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  if (regExp.test(id)) return true;
  else return false;
}

export const validatePassword = (password: string): boolean => {
  return password.length >= 8 ? true : false;
}

export const validateNickName = (nickName: string): boolean => {
  return nickName.length >= 2 && nickName.length <= 16 ? true : false;

}