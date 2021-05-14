import axiosInstance from "./axiosConfig"

export const getFundingList = () => {
    return axiosInstance.get('/fundings', {
        params: {
            page: 1,
            per_page: 100,
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