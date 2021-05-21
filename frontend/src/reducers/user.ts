import { User, ResponseUser } from '../common/types'

interface IUserAction {
    type: string,
    user?: User,
    token?: string
}

// 액션 타입
const LOGIN = 'USER/LOGIN';
const LOGOUT = 'USER/LOGOUT';

// 액션 생성함수
export function setUser(_user: ResponseUser, token: string) {
    console.log('1>>>', _user);
    console.log('2>>>', _user.userEmail);
    const user: User = {
        email: _user.userEmail,
        nickname: _user.userNickname!,
        user_id: _user.userId!,
        level: _user.userLevel!,
        address: _user.userAddress!,
        picture: _user.userPicture!,
        role: _user.role
    }

    return {
        type: LOGIN,
        user,
        token,
    }
}

export function logout() {
    return {
        type: LOGOUT
    }
}

export default function reducer(state = {}, action:IUserAction) {
    switch (action.type) {
        case LOGIN:
            return { ...state, user: action.user, token: action.token };
        case LOGOUT:
            return { ...state, user: null, token: null };
        default:
            return state;
    }
}