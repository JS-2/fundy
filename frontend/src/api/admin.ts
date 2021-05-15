import axiosInstance from "./axiosConfig";

export const getFanCertPosts = (auth_token: string) => {
    console.log(auth_token);
    return axiosInstance
        .get('/admin/fan-auth',{
        params: {
            page: 1,
            per_page: 100,
        }, headers: {
            Authorization: auth_token
        }}
        );
}