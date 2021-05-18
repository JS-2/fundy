
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

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
  role: string;
}

export interface User {
  email: string;
  nickname: string;
  user_id: number;
  level: string;
  address: string;
  picture: string;
  role: string;
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
  donationPlaceId: number | null;
  donationRate: number;
  fundingAchievementRate: string|null;
  fundingAmount: number;
  fundingConfirm: string;
  fundingId: number;
  userPays: number[]|null;
  idolId: number;
  userId: number;
  userNickname: string;
  fundingType: string| null;
  fund_Type: number| null;
  idolNumber: number| null;
  fundingName: string;
  idolName: string| null;
  fundingGoalAmount: number;
  fundingStartTime: string| null;
  fundingEndTime: string| null;
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
  fundingSubtitle: string;
  fundingRemainDay: number;
}

export interface IFunding {
  fundingAchievementRate: number;
  fundingAmount: string;
  fundingEndTime: string;
  fundingId: number;
  fundingName: string;
  fundingRemainDay: number;
  fundingStartTime: string;
  fundingSubtitle: string;
  fundingThumbnail: string;
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


export interface FundingForm{
  //폼 제출용
  donationPlaceId: number;
  donationRate: number;
  endTime: MaterialUiPickersDate;
  fundingContent: string;
  fundingName: string;
  fundingSubtitle: string;
  fundingType: string;
  goalAmount: string|number;
  idolId: number;
  startTime: MaterialUiPickersDate;
  thumbnail: any;
}



export interface FundingNotice{
  fundingNoticeId: number;
  fundingNoticeTitle: string;
  fundingNoticeContent: string;
  fundingNoticeTime: Date;
  userPicture: string|null;
  userNickname: string;
}

export interface IComment {
  fundingCommentContent: string;
  fundingCommentId: string;
  fundingCommentTime: string;
  userNickname: string;
  userPicture: string | undefined;

}

export interface IProfileAuth {
  age: string;
  name: string;
  profileHistory: string;
  profilePicture: string;
}

export interface IDonationPlace {
  donationPlaceId: number;
  placeAddress: string;
  placeDescription: string;
  placeName: string;
  placePicture: string;
}

export interface FundingStatus {
  page: number;
  per_page: number;
  status: number;
}