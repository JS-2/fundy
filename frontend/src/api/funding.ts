import axiosInstance from "./axiosConfig"

export const getFavoriteFundingList = (user_id: number) => {
    return axiosInstance.get('/user/' + user_id + "/my-funding");
}