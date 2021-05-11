import axiosInstance from "./axiosConfig"

export const getFundingList = () => {
    return axiosInstance.get('/fundings', {
        params: {
            page: 1,
            per_page: 100,
        }
    });
}

export const getFavoriteFundingList = (user_id: number) => {
    return axiosInstance.get('/user/' + user_id + "/my-funding");
}