import { User } from '../common/types'

// 액션 타입
const SET_USER = 'SET_USER';
const UNSET_USER = 'UNSET_USER';

// 액션 생성함수
export function setUser(user: User) {
    return {
        type: SET_USER,
        user
    }
}

const initialState = {
    user: {}
}

export default function reducer(state = initialState, action:ReturnType<typeof setUser>) {
    switch (action.type) {
        case SET_USER:

    }
}