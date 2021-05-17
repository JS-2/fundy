import axiosInstance from "./axiosConfig"
import { FundingStatus } from "../common/types";

export const getFundingList = (fundingStatus: FundingStatus) => {
    const { page, per_page, status, time } = fundingStatus;
    
    return axiosInstance
        .get('/fundings', {
            params: {
                page,
                per_page,
                status,
                time
            }
        });
}

export const getFavoriteFundingList = (auth_token: string) => {
    return axiosInstance.get('/user/my-funding');
}

export const postComment = (content: string, auth_token: string, funding_id: string) => {
    console.log(content)
    return axiosInstance.post('/fundings/' + funding_id + '/comments', { content: content }, {
        headers: {
            Authorization: auth_token
        }
    })
}

export const getComments = (funding_id: string) => {
    return axiosInstance.get('/fundings/' + funding_id + '/comments', {
        params: { page: 1, per_page: 1000 }
    })
}

export const deleteComment = (funding_comment_id: string, auth_token: string) => {
    return axiosInstance.delete('/fundings/comments/' + funding_comment_id, {
        headers: {
            Authorization: auth_token
        }
    })
}

export const getAllDonationPlaces = () => {
    return axiosInstance.get('/donation-places');
}

export const declineFunding = (funding_id: number, auth_token: string) => {
    return axiosInstance.patch('/admin/funding/' + funding_id + '/decline',{}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth_token
        }
    });
}

export const approveFunding = (funding_id: number, good: string, auth_token: string) => {
    return axiosInstance.patch('/admin/funding/' + funding_id + '/accept',{isGoodProject : good}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth_token
        }
    });
}

export const completeFunding = (funding_id: number, auth_token: string) => {
    console.log(auth_token);
    console.log(funding_id)
    return axiosInstance.patch('/admin/funding-complete/' + funding_id, {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth_token
        }
    });
}