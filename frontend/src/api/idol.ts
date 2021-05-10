import axiosInstance from "./axiosConfig"

export const getIdolList = (page: number) => {
    const per_page = 4;
    
    return axiosInstance
        .get('/idols', {
            params: {
                page,
                per_page,
            }
        });
}