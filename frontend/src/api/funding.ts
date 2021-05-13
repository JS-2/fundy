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