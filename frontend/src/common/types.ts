export interface RegistUser {
  email: string;
  password: string;
  nickname: string;
}

export interface LoginUser {
  userEmail: string;
  userPassword: string;
}

export interface ResponseUser {
  userEmail: string;
  userPassword: string;
  userId: number;
  userLevel: string;
  userAddress: string;
  userNickname: string;
  userPicture: string;
}

export interface User {
  email: string;
  nickname: string;
  user_id: number;
  level: string;
  address: string;
  picture: string;
}

export interface IUserState {
  user: User;
  token: string;
}

export interface FundForm {
  fundType: number;
  idolNumber: number;
  fundName: string;
  fundShortInfo: string;
  fundImgUrl: string;
  fundMoney: number;
  fundDate: string;
  location: string;
  fundDetail: string;
}
