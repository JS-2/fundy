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
  fundingId: number;
  userPays: number[]|null;
  donationPlaceId: number | null;
  idolId: number;
  userId: number;
  fundingType: string| null;
  fund_Type: number| null;
  idolNumber: number| null;
  fundingName: string;
  idolName: string| null;
  fundingGoalAmount: number;
  fundingStartTime: string| null;
  fundingEndTime: string| null;
  fundShortInfo: string;
  fundingContent: string;
  fundingThumbnail: string;
  fundImgUrl: string;
  isDonate: boolean | null;
  isConfirm: boolean | null;
  fundMoney: number;
  fundDate: string |null;
  location: string|null;
  fundDetail: string|null;
  isGoodFunding: boolean|null;
}

export interface IFunding {
  fundingId: number,
  fundingName: string,
  fundingSubtitle: string | null,
  fundingThumbnail: string
  fundingRemainDay: number,
  fundingAchievementRate: number,
  fundingAmount: string,
  fundingGoalAmount: number;
}

export interface IChartData {
  name: string,
  금액: number,
}

export interface IDonationPlace {
  donationPlaceId: number;
  idolDonationPlaceAmount: string;
  placeAddress: string;
  placeName: string;
}