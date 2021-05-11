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

export interface Idol {
    idolId: number;
    idolAge: number | null;
    idolAgency: string;
    idolBirthday: string | null;
    idolBlood: string | null;
    idolGroupId: number;
    idolHeight: number | null;
    idolName: string;
    idolPicture: string;
    idolWeight: number | null;
}

export interface IdolGroup {
  idol: Idol;
  members: Idol[];
}

export interface IdolDetailInfo {
  idolInfo: IdolGroup;
  idolFundingProject: IFunding[];
}

export interface FundForm {
  fund_Type: number;
  idolNumber: number;
  fundName: string;
  fundShortInfo: string;
  fundImgUrl: string;
  fundMoney: number;
  fundDate: string;
  location: string;
  fundDetail: string;
}

export interface IFunding {
  fundingId: number,
  fundingName: string,
  fundingSubtitle: string | null,
  fundingThumbnail: string
  fundingRemainDay: number,
  fundingAchievementRate: number,
  fundingAmount: string,
}
